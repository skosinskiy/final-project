import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {saveNewPlace} from '../../../../actions/places'
import { connect } from 'react-redux'
import places from '../../../../reducers/places'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
})

class PlaceForm extends React.Component {
  state = {
    place: {
      name: '',
      description: '',
      address: '',
      main_photo: '',
      place_category: ''
    }
  };

  handleChange = name => event => {
    this.setState({
      place: {...event.target.value}
    })
  };

  render () {
    const { classes, saveNewPlace, categories } = this.props
    const { place } = this.state
    console.log(categories)
    return (
      <div className="edit-place-form">
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-required"
            label="Title"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            value={place.title}
            onChange={this.handleChange('weightRange')}
          />

          <TextField
            id="outlined-required"
            label="Description"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            value={place.description}
            onChange={this.handleChange('weightRange')}
          />

          <TextField
            id="outlined-required"
            label="Address"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            value={place.address}
            onChange={this.handleChange('weightRange')}
          />

          <TextField
            disabled
            id="outlined-disabled"
            label="Photo"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            className={classes.textField}
            value={place.place_category}
            onChange={this.handleChange('currency')}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Please select your currency"
            margin="normal"
            variant="outlined"
          >
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </form>
        <div className="place-buttons">
          <NavLink to={'/admin/places'}>
            <Button onClick={() => saveNewPlace(place)} variant="contained" color="primary" className={classes.button}>
            Save
            </Button>
          </NavLink>
          <NavLink to={'/admin/places'}>
            <Button onClick="" variant="contained" color="secondary" className={classes.button}>
            Exit
            </Button>
          </NavLink>
        </div>
      </div>
    )
  }
}

PlaceForm.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    categories: state.places.placeCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveNewPlace: (place) => dispatch(saveNewPlace(place))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlaceForm))