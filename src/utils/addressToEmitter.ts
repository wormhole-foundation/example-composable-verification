export default function addressToEmitter(address: string) {
  return address.slice(2).toLowerCase().padStart(64, "0");
}
