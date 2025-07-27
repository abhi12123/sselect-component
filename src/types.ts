export interface IOption {
  option_id: string;
  option_label: string;
  has_group: boolean;
}

export interface ISection {
  section_id: string;
  section_label: string;
  options: IOption[];
}

export interface IGroup {
  group_title: string;
  group_id: string;
  sections: ISection[];
  path: {
    group_id: string;
    group_label: string;
  }[];
}
