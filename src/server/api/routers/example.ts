import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

type Prediction = {
  box: number[];
  category: string;
  score: number;
};
type ResType = { predictions: Prediction[] };

export const herrkosRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  fetchBox: protectedProcedure
    .input(
      z.object({
        image_url: z.string().refine((url) => url.includes("unsplash.com")),
      })
    )
    .mutation(async ({ input: { image_url } }) => {
      const res = await fetch("https://api.herrkos.com/process_image", {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ image_url }),
      });
      const data = (await res.json()) as ResType;
      console.log(data);

      return data;
      // return {
      //   predictions: [
      //     {
      //       box: [
      //         303.3891906738281, 348.1337890625, 506.9868469238281,
      //         605.1771850585938,
      //       ], //x1, y1, x2, y2
      //       category: "Hardhat",
      //       score: 0.9024907350540161,
      //     },
      //   ],
      // };
    }),
});
