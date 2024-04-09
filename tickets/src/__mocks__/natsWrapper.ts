export const client = {
  publish(subject: string, data: string, callback: () => Promise<void>) {
    callback();
  },
};
