import { strict as assert, AssertionError } from 'assert';
import Validator from './Validator';
import CustomError from './Error/CustomError';
import IAgenda from '../interface/agenda';
import Agenda from '../models/agenda';
import UserRequestError from './Error/UserRequestError';
import User from '../models/user';
import { AgendaComponent } from '../interface/pageResource/dashboard/listAgenda';
import Berita from '../models/berita';
import IBerita from '../interface/berita';
import BeritaComponent from '../interface/pageResource/dashboard/berita/componentBerita';

export default class Dashboard {
  adminID: number;

  constructor(adminID: number) {
    this.adminID = adminID;
  }

  async createAgenda(
    title: string, date: string,
    time: string, location: string,
  ): Promise<void> {
    try {
      this.validateAllNotUndefined(title, date, time, location);
      Validator.isValidDateString(date);

      await this.saveNewAgenda(title, date, time, location);
    } catch (e: unknown) {
      throw new UserRequestError(`Failed to create new agenda: ${title}`, 'Please try to fill all required fields');
    }
  }

  async saveNewAgenda(
    title: string, date: string,
    time: string, location: string): Promise<void> {
    try {
      const newAgenda = new Agenda({
        title,
        time,
        location,
        creatorID: this.adminID,
        creatorName: await this.getName(),
        date: new Date(date),
      });

      await newAgenda.save();
    } catch (e: unknown) {
      throw new CustomError('System failed to create new agenda')
    }
  }

  async deleteAgenda(agendaID: string | undefined): Promise<void> {
    try {
      if (agendaID === undefined) throw new UserRequestError('agenda ID must be defined', 'Define agenda ID in your request body');

      await Agenda.deleteOne({ _id: agendaID });
    } catch (e: unknown) {
      if (e instanceof UserRequestError) throw e;

      const err = new CustomError('server failed to delete agenda.');
      await err.logError();

      throw err;
    }
  }

  async updateAgenda(
    agendaID: string | undefined,
    title: string, date: string,
    time: string, location: string,
  ): Promise<void> {
    try {
      if (agendaID === undefined) throw new Error();
      this.validateAllNotUndefined(title, date, time, location);

      await Agenda.findOneAndUpdate(
        { _id: agendaID },
        {
          title, date, time, location,
        },
      );
    } catch (e: unknown) {
      throw new UserRequestError('Update agenda failed', 'Try suplly all necessary data.');
    }
  }

  async getName(): Promise<string> {
    try {
      const creatorName = await User.findOne({ id: this.adminID }, {
        username: 1,
        id: -1,
        _id: -1,
      });

      assert.notStrictEqual(creatorName, null);

      return creatorName.username;
    } catch (e: unknown) {
      if (e instanceof AssertionError) return '';

      const err = new CustomError('System failed to fetch creator name from ID.');
      await err.logError();

      return '';
    }
  }

  async createNewBerita(title: string, content: string, filename: string): Promise<void> {
    try {
      this.validateAllNotUndefined(title, content, filename);

      const berita = new Berita({
        title,
        content,
        filename,
      });

      await berita.save();
    } catch (e: unknown) {
      throw new UserRequestError('failed to create new berita.', 'Make sure you send data according on our rules');
    }
  }

  async deleteBerita(beritaID: string): Promise<void> {
    try {
      this.validateAllNotUndefined(beritaID);

      await Berita.findOneAndDelete({ _id: beritaID });
    } catch (e: unknown) {
      throw new UserRequestError(`Sistem failed to delete berita with id: ${beritaID}`, 'Please try again and supply valid berita id.');
    }
  }

  async updateBerita(beritaID: string, title: string, content: string, filename: string | undefined): Promise<void> {
    const newBerita: {
      title?: string,
      content?: string
      filename?: string | undefined,
    } = {};

    try {
      this.validateAllNotUndefined(beritaID, title, content);

      newBerita.title = title;
      newBerita.content = content;
      if (filename) newBerita.filename = filename;

      await Berita.findByIdAndUpdate(beritaID, newBerita);
    } catch (e: unknown) {
      throw new UserRequestError('Failed to update berita.', 'Make sure you send correct request to');
    }
  }

  validateAllNotUndefined(...items: any[]) {
    for (let i = 0; i < items.length; i++) {
      if (items[i] === undefined || items[i] === '') throw new Error('Missing required item(s) detected');
    }
  }

  static async getAgenda(): Promise<Array<IAgenda>>{
    try {
      const allAgenda = await Agenda.find().sort({
        'date': -1,
      });
      
      return allAgenda;
    } catch (e: unknown) {
      const err = new CustomError('System failed to fetch all agenda from dashboard');
      await err.logError();

      return [];
    }
  }

  static async getBerita(): Promise<Array<IBerita>> {
    try {
      const result = await Berita.find().sort({
        'updatedAt': -1,
      });

      return result;
    } catch (e: unknown) {
      const err = new CustomError('System failed to fetch berita. This may result user seeing empty berita');
      await err.logError();

      return [];
    }
  }

  static async getAgendaFromAgendaID(agendaID: string): Promise<AgendaComponent> {
    try {
      const agenda = await Agenda.findById(agendaID);

      if (agenda === null) throw new UserRequestError('agenda is not found', 'try to supply valid agenda ID');

      return agenda;
    } catch (e: unknown) {
      if (e instanceof UserRequestError) throw new UserRequestError('Agenda you request is not found', 'try send valid agendaID in your request');

      throw e;
    }
  }

  static async getBeritaFromBeritaID(beritaID: string): Promise<BeritaComponent> {
    try {
      if (!beritaID) throw new Error();

      const result = await Berita.findById(beritaID);

      if (result === null) throw new Error();

      return result;
    } catch (e: unknown) {
      throw new UserRequestError('Berita not found.', 'Check your request data (beritaID)', 404);
    }
  }

  static async getCreatorNameFromIDs(IDs: number[]): Promise<string[]> {
    try {
      const creatorNames: string[] = await User.find({
        id: {
          $in: IDs,
        },
      }, { name: 1, _id: -1 });

      return creatorNames;
    } catch (e: unknown) {
      const err = new CustomError('System failed to fetch creator name from IDs.');
      await err.logError();

      return [];
    }
  }
}