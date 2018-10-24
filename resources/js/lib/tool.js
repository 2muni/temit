export function dateSplit(str, y, m, d) {
  let date = str.split(' ')[0].split('-');
  return(
    date[0]+y+' '+date[1]+m+' '+date[2]+d
  )
}