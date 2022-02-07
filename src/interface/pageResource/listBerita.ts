export interface BeritaComponent {
  filename: string,
  title: string,
  content: string,
}

export default interface ListBerita {
  listBerita: BeritaComponent[],
}