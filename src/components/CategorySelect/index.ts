import { createStyles, makeStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import CATEGORIES from '@/constants/Categories'
import { useState } from 'react'

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
)

const CategorySelect = ({ onCategoryChange }) => {
  const classes = useStyles()
  const [selectedCategory, setCategory] = useState(CATEGORIES[0])

  const handleChange = (event) => {
    setCategory(event.target.value)
    onCategoryChange(event.target.value)
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        Category
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedCategory}
        onChange={handleChange}
      >
        {CATEGORIES.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CategorySelect
