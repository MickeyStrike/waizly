export interface TodoList {
  id: string,
  title: string,
  data: DataTodo[]
}

export interface DataTodo {
  id: string,
  title: string,
  description: string,
  tag: string // this will save uuid
}

export interface Tag {
  id: string,
  name: string,
  background: string,
  color: string,
  selectedBackground: string
  selectedColor: string
}

export interface DataTime {
  abbreviation: string;
  client_ip:    string;
  datetime:     Date;
  day_of_week:  number;
  day_of_year:  number;
  dst:          boolean;
  dst_from:     null;
  dst_offset:   number;
  dst_until:    null;
  raw_offset:   number;
  timezone:     string;
  unixtime:     number;
  utc_datetime: Date;
  utc_offset:   string;
  week_number:  number;
}