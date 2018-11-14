import React from 'react'
import { SSItem } from '../SSItem'

const SSList = ({
  list
}) => (
  <React.Fragment>
    {list.map((item, i) => (
      <SSItem
        key={i}
        item={item}
      />
    ))}
  </React.Fragment>
)

export default SSList