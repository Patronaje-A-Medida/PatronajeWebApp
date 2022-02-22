import { StatusOption } from '../models/generics/status-option';
import { EnumStatus } from './status.enums';

const EStatus = EnumStatus;
export const DictStatus: StatusOption[] = [
  { key: 'Sin Atender', value: EnumStatus.unattended.toString() },
  { key: 'En Progreso', value: EnumStatus.inProgress.toString() },
  { key: 'Atendidos', value: EnumStatus.attended.toString() },
  { key: 'Todos', value: null },
];
