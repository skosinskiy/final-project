import React, {Component} from 'react'
import {toastr} from 'react-redux-toastr'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'
import {placesOperations} from '../../../../../../store/places'
import {businessOperations} from "../../../../../../store/businesses";

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '45%'
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
  },

  buttonLink: {
    marginRight: '10px',
    textDecoration: 'none'
  },

  buttons: {
    margin: '8px',
    textDecoration: 'none',
  }

})

const emptyBusiness = {
  title: "",
  description: "",
  address: "",
  webSite: "",
  phoneNumber: "",
  mainPhoto: null,
  photos: null,
  place: undefined,
}

const emptyPlace = {
  title: 'New empty place',
  description: 'This place was created by providing non-existent placeID during creation/editing of business profile.',
  address: 'Unknown address',
  placeCategory: {}
}

class BusinessForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      editedBusiness: props.business !== undefined ? props.business : emptyBusiness,
      place: undefined
    }
  }

  componentDidMount() {
    this.props.getPlaces()
  }

  getSpecificPlace = (placeID) => {
    const {places} = this.props
    for (const place of places){
      if (place.id === parseInt(placeID)){
        return place
      }
    }
    return null
  }

  saveBusiness = () => {
    const {saveNewBusiness} = this.props
    const {editedBusiness, place} = this.state
    const placeID = editedBusiness.place !== undefined ? editedBusiness.place.id : place
    const placeObject = this.getSpecificPlace(placeID)
    const toastrOptions = {timeoOut: 6000}

    placeObject !== null
      ? saveNewBusiness({...this.state.editedBusiness, ['place']: placeObject})
      : toastr.error('Error', 'Provided PlaceID does not exist in DB. Please create a new place first', toastrOptions)
  }

  handleChange = (event, propName) => {
    if (propName === 'place'){
      this.setState({place: event.target.value})
    } else {
      this.setState({editedBusiness: {...this.state.editedBusiness, [propName]: event.target.value}})
    }
  }

  render () {
    const {classes} = this.props
    const {editedBusiness, place} = this.state
    return (
      <div className={classes.container}>
        <TextField
          label='Business name'
          style={{margin: 8}}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedBusiness.title}
          onChange={(e) => this.handleChange(e, 'title')}
        />
        <TextField
          label='Description'
          style={{margin: 8}}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedBusiness.description}
          onChange={(e) => this.handleChange(e, 'description')}
        />
        <TextField
          label='Address'
          style={{margin: 8}}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedBusiness.address}
          onChange={(e) => this.handleChange(e, 'address')}
        />
        <TextField
          label='Website'
          style={{margin: 8}}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedBusiness.webSite}
          onChange={(e) => this.handleChange(e, 'webSite')}
        />
        <TextField
          label='Phone Number'
          style={{margin: 8}}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedBusiness.phoneNumber}
          onChange={(e) => this.handleChange(e, 'phoneNumber')}
        />
        <TextField
          label='Place ID'
          style={{margin: 8}}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedBusiness.place !== undefined ? editedBusiness.place.id : place}
          onChange={(e) => this.handleChange(e, 'place')}
        />
        <div className={classes.buttons}>
          <NavLink to={'/admin/businesses'} className={classes.buttonLink}>
            <Button
              onClick={this.saveBusiness}
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Save
            </Button>
          </NavLink>
          <NavLink to={'/admin/businesses'} className={classes.buttonLink}>
            <Button variant='contained' color='secondary' className={classes.button}>
              Exit
            </Button>
          </NavLink>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const business = state.businesses.businessList.find(business => business.title === props.match.params.title)

  return {
    places: state.places.places,
    business
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPlaces: () => dispatch(placesOperations.getPlaces()),
    saveNewBusiness: (business) => dispatch(businessOperations.saveNewBusiness(business)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BusinessForm))