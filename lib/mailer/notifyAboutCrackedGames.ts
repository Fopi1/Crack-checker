import { prisma } from "@/prisma/prisma";

import { sendCrackedGameNotification } from "../mailer";

export const notifyAboutCrackedGames = async () => {
  const crackedGames = await prisma.game.findMany({
    where: {
      crackDate: {
        not: null,
      },
    },
    select: {
      id: true,
      title: true,
      crackDate: true,
      subscriptions: {
        where: {
          notifiedOnCrack: false,
          createdAt: {
            lt: new Date(),
          },
        },
        include: {
          user: true,
        },
      },
    },
  });

  for (const game of crackedGames) {
    for (const subscription of game.subscriptions) {
      if (subscription.createdAt < new Date(game.crackDate!)) {
        if (subscription.user.email) {
          await sendCrackedGameNotification(
            subscription.user.email,
            game.title
          );

          await prisma.subscription.update({
            where: {
              id: subscription.id,
            },
            data: { notifiedOnCrack: true },
          });
        }
      }
    }
  }
};
