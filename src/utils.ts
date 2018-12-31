export function assign(obj: Object, props: Object): Object {
  for (let i in props) obj[i] = props[i];
  return obj;
}
