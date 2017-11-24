import React from 'react';
// import Link from '../../components/Link';
// import {setVisibilityFilter} from '../../actions/filter';
// // import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';

// class FilterLink extends React.Component {
//   render() {
//     return (
//       <Link
//         active={this.props.active}
//         onLinkClick={this.props.setVisibilityFilter}
//         filter={this.props.filter}>
//         {this.props.children}
//       </Link>
//     )
//   }
// }

// const mapStateToProps = (state, ownProps) => ({
//   active: ownProps.filter === state.visibilityFilter,
//   visibilityFilter: state.visibilityFilter
// });

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   setVisibilityFilter() {
//     dispatch(setVisibilityFilter(ownProps.filter))
//   }
// });

// export default connect(mapStateToProps, mapDispatchToProps)(FilterLink);



import {NavLink} from 'react-router-dom';

const FilterLink = ({filter, children}) => (
  <NavLink
    exact
    to={filter === 'all' ? '/' : `/${filter}`}
    activeStyle={{
      textDecoration: 'none',
      color: 'green'
    }}
  >
    {children}
  </NavLink>
);
export default FilterLink;