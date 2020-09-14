import React from "react";
import {MDBCol, MDBContainer, MDBIcon, MDBProgress, MDBRow} from "mdbreact";

const StarBar = (props) => {
	return (
		<MDBContainer className="mb-3">
			<MDBRow>
				<MDBCol md="1" className="p-0">
					<div className="d-flex">
						<span style={{fontSize: "18px"}}>{props.star}</span><MDBIcon icon="star" size="sm" className="amber-text"/>
					</div>
				</MDBCol>
				<MDBCol md="8" className="pl-1">
					<MDBProgress value={props.percentage} className="mt-2" color="success"/>
				</MDBCol>
				<MDBCol md="3" className="pl-0 mt-2 font-small">
					<span>{props.percentage}%</span>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default StarBar;