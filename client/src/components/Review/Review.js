import React from "react";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {Rating} from "@material-ui/lab";

import ImgLightbox from "../ImgLightbox/ImgLightbox";

const Review = (props) => {
	let timePost = props.timePost;
	let timeDesc;
	if (timePost <= 31) {
		timeDesc = `${timePost} ngày trước`;
	} else if (timePost <= 365) {
		timeDesc = `${Math.floor(timePost / 31)} tháng trước`;
	} else {
		timeDesc = `${Math.floor(timePost / 365)} năm trước`;
	}
	
	return (
		<MDBContainer className="pt-2 pb-2 mb-3">
			<MDBRow>
				<MDBCol md="3" className="text-center">
					<img
						style={{width: "65px", height: "65px", objectFit: "cover"}}
						className="avatar-img rounded-circle"
						src={props.customerAvatar}
						alt="avatar"
					/>
					<p className="pt-2">{props.customerName}</p>
					<p className="font-small">{timeDesc}</p>
				</MDBCol>
				<MDBCol md="9" className="pl-0">
					<MDBContainer className="pr-0">
						<div className="left-center mb-0">
							<Rating value={props.customerRating} precision={0.1} readOnly/>
							<p className="ml-1 font-weight-bolder" style={{fontSize: "18px"}}>
								{props.postTitle}
							</p>
						</div>
						<div>
							<p className="text-justify mr-2">{props.postContent}</p>
						</div>
						{props.images ?
							<div className="mt-2 mb-2 text-center">
								<ImgLightbox
									onClosed={props.onClosed}
									afterOpened={props.onOpened}
									images={props.images.map(i => i.full_path)}
								/>
							</div>
							: null
						}
					</MDBContainer>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default Review;