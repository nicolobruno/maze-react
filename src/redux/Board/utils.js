import Immutable from 'seamless-immutable';

export function stringArrayToObject(actionsArray, namespace = '') {
  if (actionsArray.some(actionName => !actionName || typeof actionName !== 'string')) {
    throw new Error('Action names must be strings and must not be empty');
  }
  const prefix = namespace ? `${namespace}:` : '';
  return Immutable(actionsArray).asObject(actionName => [actionName, `${prefix}${actionName}`]);
}
