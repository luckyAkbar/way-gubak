export interface AgendaComponent {
  title: string,
  time: string,
  date: Date,
  creatorName: string,
  location: string,
}

export default interface ListAgenda {
  listAgenda: AgendaComponent[],
}