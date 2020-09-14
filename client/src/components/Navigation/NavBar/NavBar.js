import React, {Component} from "react";
import {
	MDBCollapse,
	MDBDropdown,
	MDBDropdownMenu,
	MDBDropdownToggle,
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavbarToggler,
	MDBNavItem,
	MDBNavLink
} from "mdbreact";
import DropdownItem from "../../Dropdown/DropdownItem";
import withLoadCategories from "../../../hoc/withLoadCategories/withLoadCategories";

class NavBar extends Component {
	state = {
		isOpen: false,
		activeItem: this.props.location.pathname
	};
	
	toggleCollapse = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};
	
	togglePills = () => {
		this.setState({
			isOpen: false
		});
	};
	
	render() {
		let categories;
		if (this.props.allCategories) {
			categories = this.props.allCategories.map(c => {
				return (
					<DropdownItem
						key={c}
						name={c}
					/>
				);
			});
		}
		
		return (
			<MDBNavbar
				className="primary-color"
				dark
				expand="md"
				fixed={this.props.isFixed}
				scrollingNavbarOffset={50}
			>
				<MDBNavbarBrand href="/" onClick={this.togglePills}>
					<strong className="white-text">Market</strong>
				</MDBNavbarBrand>
				<MDBNavbarToggler onClick={this.toggleCollapse}/>
				<MDBCollapse
					id="navbarCollapse3"
					isOpen={this.state.isOpen}
					navbar
				>
					<MDBNavbarNav left>
						<MDBNavItem active={this.state.activeItem === "/products"}>
							<MDBNavLink
								link
								to="/products"
							>
								Sản phẩm
							</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
							<MDBDropdown dropright>
								<MDBDropdownToggle nav caret>
									<span className="mr-2">Danh mục sản phẩm</span>
								</MDBDropdownToggle>
								<MDBDropdownMenu onClick={this.togglePills}>
									{categories}
								</MDBDropdownMenu>
							</MDBDropdown>
						</MDBNavItem>
					</MDBNavbarNav>
					<MDBNavbarNav right>
						<MDBNavItem active={this.state.activeItem === "/contact"}>
							<MDBNavLink
								link
								to="/contact"
							>
								Hỗ trợ
							</MDBNavLink>
						</MDBNavItem>
					</MDBNavbarNav>
				</MDBCollapse>
			</MDBNavbar>
		);
	}
}


export default withLoadCategories(NavBar);
