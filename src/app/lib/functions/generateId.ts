export default function generateID() {
  const length = 12;
  var id: string = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let i: number = 0;
  while (i < length) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
    i += 1;
  }

  return new Date().valueOf().toString() + id;
}
