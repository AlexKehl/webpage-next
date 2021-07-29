import CATEGORIES from '../constants/Categories'
import React, { FC, useState } from 'react'

interface Props {
  onCategoryChange: (event: any) => void
}

const CategorySelect: FC<Props> = ({ onCategoryChange }) => {
  const [selectedCategory, setCategory] = useState(CATEGORIES[0])

  const handleChange = (event: any) => {
    setCategory(event.target.value)
    onCategoryChange(event.target.value)
  }

  return (
    <div></div>
    // <FormControl className={classes.formControl}>
    //   <InputLabel shrink id="demo-simple-select-placeholder-label-label">
    //     Category
    //   </InputLabel>
    //   <Select
    //     labelId="demo-simple-select-label"
    //     id="demo-simple-select"
    //     value={selectedCategory}
    //     onChange={handleChange}
    //   >
    //     {CATEGORIES.map((category) => (
    //       <MenuItem key={category} value={category}>
    //         {category}
    //       </MenuItem>
    //     ))}
    //   </Select>
    // </FormControl>
  )
}

export default CategorySelect
