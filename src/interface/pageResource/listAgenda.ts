export interface AgendaComponent {
  title: string,
  date: Date,
  time: string,
  location: string,
}

export default interface ListAgenda {
  listAgenda: AgendaComponent[],
}