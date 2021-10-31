import Dexie from 'dexie'

export interface SaveData {
  title: string;
  remark: string;
  status?: number;
}

export interface ToDoItem {
  title: string;
  remark: string;
  status: number;
  time: number;
  id: number;
}

class IndexedDb {
  db: Dexie
  constructor() {
    this.db = new Dexie('ToDo-list')
    this.db.version(1).stores({
      record: '++id,title,remark,*status,*time'
    })
  }
  getItemById(id: number, table: string = 'record') {
    return new Promise((resolve, reject) => {
      this.db.table(table).where({id: id}).first().then(res => {
        resolve(res)
      })
    })
  }
  saveItem(data: SaveData, table: string = 'record') {
    return new Promise((resolve, reject) => {
      this.db.table(table).add({...data, status: 0, time: +(new Date())}).then(res => {
        resolve(res)
      })
    })
  }
  getList(status:number[] = [0], table: string = 'record'): Promise<ToDoItem> {
    return new Promise((resolve, reject) => {
      this.db.table(table).where('status').anyOf([0, 1]).sortBy('time').then(res => {
        resolve(res)
      })
    })
  } 
}


export default new IndexedDb()