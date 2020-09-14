import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {MDBBadge, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBIcon, MDBMask, MDBView} from "mdbreact";
import {Rating} from "@material-ui/lab";

import {formatNumber} from "../../utils/utilities";

import "./Card.css";

const Card = (props) => {
	const [isSale, setIsSale] = useState(false);
	const [salePer, setSalePer] = useState(0);
	
	useEffect(() => {
		if (props.price < props.list_price) {
			setIsSale(true);
			setSalePer((100 - props.price / props.list_price * 100).toPrecision(2));
		}
	}, [props.list_price, props.price]);
	
	let img;
	if (props.imageUrl.includes("/ts/")) {
		img = props.imageUrl.replace("/ts/", "/cache/280x280/ts/");
	} else if (props.imageUrl.includes("/media/")) {
		img = props.imageUrl.replace("/media/", "/cache/280x280/media/");
	}
	
	return (
		<MDBCol lg="3" md="6" className="mb-5">
			<MDBCard>
				<MDBView zoom hover>
					<MDBCardImage
						className="w-100"
						top
						src={img}
						alt={props.name}
					/>
					{isSale ? <h4 className="mb-0">
						<MDBBadge className="badge-news" pill color="danger">-{salePer}%</MDBBadge>
					</h4> : null}
					<Link to={`/products/${props.id}`}>
						<MDBMask>
							<MDBCardImage
								className="w-100"
								top
								src={img}
							/>
							<MDBMask/>
						</MDBMask>
					</Link>
				</MDBView>
				<MDBCardBody className="text-center pt-2">
					<Link to={`/products/${props.id}`}>
						<h5 className="black-text scale-card" style={{height: "50px"}} title={props.name}>{props.name}</h5>
					</Link>
					<Rating className="pt-2" value={Number(props.rating)} precision={0.1} readOnly/>
					<hr/>
					<p style={{height: "50px"}}>
						<strong className="h4">{formatNumber(props.price)} đ̲</strong>
						{isSale ? <span className="ml-2 d-block mt-2"
						                style={{textDecoration: "line-through"}}>{formatNumber(props.list_price)} đ̲</span> : null}
					</p>
					<Link to={`/products/${props.id}`}>
						<MDBBtn className="primary-color mr-1 mb-2">
							<MDBIcon icon="info-circle"/>
							<span className="ml-2">Chi tiết</span>
						</MDBBtn>
					</Link>
					{props.isProductsPage ?
						<a href={props.link}
						   className="ml-2" rel="noopener noreferrer"
						   target="_blank">
							<MDBIcon icon="external-link-alt"/>
						</a>
						: null
					}
				
				</MDBCardBody>
			</MDBCard>
		</MDBCol>
	);
};

export default Card;
