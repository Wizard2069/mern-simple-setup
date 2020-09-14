import React, {Component} from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import {Rating} from "@material-ui/lab";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import parse from "html-react-parser";
import {Helmet} from "react-helmet";

import Jumbotron from "../../components/Layout/UI/Jumbotron/Jumbotron";
import Search from "../../components/Form/Search/Search";
import "./Product.css";
import ProductImage from "../../components/ProductImage/ProductImage";
import StarBar from "../../components/StarBar/StarBar";
import Review from "../../components/Review/Review";
import NavBar from "../../components/Navigation/NavBar/NavBar";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/Spinner/Spinner";
import {formatNumber} from "../../utils/utilities";
import openBox from "../../assets/images/open-box.jpg";
import queryString from "query-string";

class Product extends Component {
	descRef = React.createRef();
	state = {
		isOpen: false,
		btnTitle: "Xem thêm",
		fixed: "top",
		input: "",
		descHeight: null
	};
	
	async componentDidMount() {
		const prodId = this.props.match.params.product_id;
		await this.props.onGetProduct(prodId);
		setTimeout(() => {
			if (this.descRef && this.descRef.current && this.descRef.current.offsetHeight) {
				this.setState({
					descHeight: this.descRef.current.offsetHeight
				});
			}
		}, 2500);
	}
	
	onHandleCollapse = () => {
		this.setState(prevState => {
			return {
				isOpen: !prevState.isOpen,
				btnTitle: !prevState.isOpen ? "Thu gọn" : "Xem thêm"
			};
		});
		if (this.state.isOpen) {
			window.scrollTo(0, this.descRef.current.offsetParent.offsetTop);
		}
	};
	
	onHandleOpenLightbox = () => {
		this.setState({
			fixed: ""
		});
	};
	
	onHandleCloseLightbox = () => {
		this.setState({
			fixed: "top"
		});
	};
	
	onHandleInputSearchChange = (e) => {
		e.preventDefault();
		this.setState({
			input: e.target.value
		});
	};
	
	onHandleSubmitSearch = (e) => {
		e.preventDefault();
		if (this.state.input !== "") {
			this.props.history.push({
				pathname: "/search",
				query: {
					q: this.state.input
				},
				search: queryString.stringify({
					q: this.state.input
				})
			});
		}
	}
	
	render() {
		let descStyle = {
			maxHeight: "500px"
		};
		
		let prodDesc = null;
		
		if (this.state.isOpen) {
			descStyle.maxHeight = "none";
		}
		
		let foundProductSection = <Spinner/>;
		let desc = null, reviewSection, stars = [], reviews = [];
		
		if (!this.props.loading && this.props.error && this.props.status && !this.props.product) {
			if (this.props.status === 404) {
				foundProductSection = (
					<div className="product-not-exist">
						<div className="not-exist-content">
							<img src={openBox} alt="product not found" width="125" height="125"
							     className="border-0 mb-2"/>
							<p>Không tìm thấy sản phẩm này</p>
						</div>
					</div>
				);
			}
		}
		
		if (!this.props.loading && this.props.product && this.props.reviews && this.props.stars) {
			prodDesc = this.props.product.description;
			
			desc = (
				<div
					ref={this.descRef}
				>
					{parse(prodDesc)}
				</div>
			);
			
			for (let key in this.props.stars[0].stars) {
				if (this.props.stars[0].stars.hasOwnProperty(key)) {
					stars.push(
						<StarBar
							key={key}
							star={key}
							percentage={this.props.stars[0].stars[key].percent}
						/>
					);
				}
			}
			
			this.props.reviews.forEach(r => {
				reviews.push(
					<Review
						key={r._id}
						onClosed={this.onHandleCloseLightbox}
						onOpened={this.onHandleOpenLightbox}
						customerAvatar={r.created_by.avatar_url}
						customerName={r.created_by.full_name}
						timePost={Math.ceil((new Date() - new Date(r.created_at)) / (1000 * 60 * 60 * 24))}
						customerRating={r.rating}
						postTitle={r.title}
						postContent={r.content}
						images={r.images}
					/>
				);
			});
			
			let smallImage, bigImage;
			if (this.props.product.image_url.includes("/ts/")) {
				smallImage = this.props.product.image_url.replace("/ts/", "/cache/280x280/ts/");
				bigImage = this.props.product.image_url.replace("/ts/", "/cache/1200x1200/ts/");
			} else if (this.props.product.image_url.includes("/media/")) {
				smallImage = this.props.product.image_url.replace("/media/", "/cache/280x280/media/");
				bigImage = this.props.product.image_url.replace("/media/", "/cache/1200x1200/media/");
			}
			
			foundProductSection = (
				<>
					<section className="mb-5">
						<MDBRow>
							<MDBCol md="6" className="mb-4 mb-md-0">
								<MDBRow className="text-center">
									<ProductImage
										smallImg={smallImage}
										mainImg={bigImage}
									/>
								</MDBRow>
							</MDBCol>
							<MDBCol md="6">
								<h3 className="font-weight-bold"
								    style={{wordWrap: "break-word"}}>{this.props.product.name}</h3>
								<p className="mb-2 text-muted text-uppercase">{this.props.product.category}</p>
								<Rating value={this.props.product.rating_average} precision={0.1} readOnly/>
								<p>
									Giá sản phẩm: <span
									className="mr-1 red-text h4"><strong>{formatNumber(this.props.product.price)} đ̲</strong></span>
								</p>
								{this.props.product.price < this.props.product.list_price ?
									<>
										<p className="mb-0">
											Tiết
											kiệm: {(100 - this.props.product.price / this.props.product.list_price * 100).toPrecision(2)}%
											({formatNumber(this.props.product.list_price - this.props.product.price)}đ)
										</p>
										<p>Giá trên thị trường: {formatNumber(this.props.product.list_price)}đ</p>
									</>
									: null
								}
								
								{this.props.product.summary_description ?
									<MDBRow>
										<MDBCol size="8" className="border-bottom border-top">
											<p className="pt-1 font-small">
												{parse(this.props.product.summary_description)}
											</p>
										</MDBCol>
									</MDBRow>
									: null
								}
								
								<MDBBtn
									className="mt-3" color="primary"
									href={this.props.product.link}
									target="_blank"
								>
									<MDBIcon className="mr-2" icon="shopping-cart"/>
									Mua ngay
								</MDBBtn>
							</MDBCol>
						</MDBRow>
					</section>
					
					<section className="mb-5">
						<h4 className="mb-4 text-uppercase">Mô tả sản phẩm</h4>
						<MDBContainer className="bg-light p-2 iframe-container overflow-hidden" style={descStyle}>
							{desc}
						</MDBContainer>
						{this.state.descHeight > 500 ?
							<MDBContainer className="text-center bg-light">
								<MDBBtn
									className="mt-3 mb-3"
									onClick={this.onHandleCollapse}
									outline
									color="primary"
								>
									{this.state.btnTitle}
								</MDBBtn>
							</MDBContainer> : null
						}
					
					</section>
				</>
			);
			
			reviewSection = (
				<>
					<section className="mb-5">
						<h4 className="text-uppercase mb-4">
							Nhận xét từ khách hàng
						</h4>
						<MDBContainer className="bg-light p-2">
							<MDBRow>
								<MDBCol md="4" className="text-center">
									<h5 className="mt-2" style={{fontSize: "18px"}}>Trung bình</h5>
									<p className="text-danger font-weight-bold mb-1"
									   style={{fontSize: "47px"}}>{this.props.product.rating_average}/5</p>
									<Rating value={this.props.product.rating_average} precision={0.1} readOnly
									        size="large"/>
									<p className="font-small">({this.props.product.review_count} nhận xét)</p>
								</MDBCol>
								<MDBCol md="8" className="mt-1">
									{stars}
								</MDBCol>
							</MDBRow>
							{this.props.reviews.length > 0 ?
								<>
									<hr/>
									<MDBRow className="pt-3 pb-3">
										<MDBContainer>
											<h4 className="font-italic">Một số nhận xét hữu ích</h4>
										</MDBContainer>
									</MDBRow>
									<MDBRow>
										{reviews}
									</MDBRow>
								</> : null
							}
						</MDBContainer>
					</section>
				</>
			);
		}
		
		return (
			<>
				<Helmet>
					<title>{!this.props.loading && this.props.product ? this.props.product.name : null}</title>
				</Helmet>
				<header>
					<NavBar isFixed={this.state.fixed}/>
				</header>
				<Jumbotron title="Thông tin sản phẩm" classname="jumbotron-img"/>
				<main>
					<MDBContainer>
						<section className="mb-5">
							<MDBRow center>
								<Search
									value={this.state.input}
									handleChange={this.onHandleInputSearchChange}
									handleSubmit={this.onHandleSubmitSearch}
								/>
							</MDBRow>
						</section>
						{foundProductSection}
						{reviewSection}
					</MDBContainer>
				</main>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		product: state.productReducer.product,
		reviews: state.productReducer.reviews,
		stars: state.productReducer.stars,
		loading: state.productReducer.loading,
		status: state.productReducer.status,
		error: state.productReducer.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetProduct: (id) => dispatch(actions.getProduct(id))
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));