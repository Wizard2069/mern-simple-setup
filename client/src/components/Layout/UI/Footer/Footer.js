import React from "react";
import {MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon} from "mdbreact";

import "./Footer.css";

const Footer = () => {
	return (
		<>
			<MDBFooter
				className="font-small elegant-color w-100"
			>
				<div className="primary-color">
					<MDBContainer>
						<MDBRow className="py-4 d-flex align-items-center">
							<MDBCol md="6" lg="5" className="text-center text-md-left mb-4 mb-md-0">
								<h6 className="mb-0">Kết nối với chúng tôi trên mạng xã hội!</h6>
							</MDBCol>
							<MDBCol md="6" lg="7" className="text-center text-md-right">
								<a href="https://www.facebook.com/" rel="noopener noreferrer" target="_blank">
									<MDBIcon fab icon="facebook-f" className="white-text mr-4"/>
								</a>
								<a href="https://twitter.com/" rel="noopener noreferrer" target="_blank">
									<MDBIcon fab icon="twitter"  className="white-text mr-4"/>
								</a>
								<a href="https://github.com/" rel="noopener noreferrer" target="_blank">
									<MDBIcon fab icon="github" className="white-text mr-4"/>
								</a>
								<a href="https://www.youtube.com/" rel="noopener noreferrer" target="_blank">
									<MDBIcon fab icon="youtube" className="white-text"/>
								</a>
							</MDBCol>
						</MDBRow>
					</MDBContainer>
				</div>
				
				<MDBContainer className="text-center text-md-left pt-4 pt-md-5">
					<MDBRow>
						<MDBCol md="4" className="mx-auto mt-3 mt-md-0 mb-md-4">
							<h5 className="title">Về chúng tôi</h5>
							<hr className="w-50 primary-color d-inline-block mx-auto mb-4 mt-0"/>
							<p>
								Nhóm BTL OOP IT2-02
							</p>
						</MDBCol>
						<hr className="clearfix w-100 d-md-none"/>
						<MDBCol md="4">
							<h5 className="title">Tham khảo</h5>
							<hr className="w-50 primary-color d-inline-block mx-auto mb-4 mt-0"/>
							<ul className="pd-inline-start">
								<li className="list-unstyled mb-2">
									<a href="https://tiki.vn" target="_blank" rel="noopener noreferrer">Tiki</a>
								</li>
								<li className="list-unstyled mb-2">
									<a href="https://shopee.vn" target="_blank" rel="noopener noreferrer">Shopee</a>
								</li>
							</ul>
						</MDBCol>
						<MDBCol md="4">
							<h5 className="title">Liên hệ với chúng tôi</h5>
							<hr className="w-50 primary-color d-inline-block mx-auto mb-4 mt-0"/>
							<ul className="pd-inline-start">
								<li className="list-unstyled mb-2">
									<a href="https://www.facebook.com/profile.php?id=100006300518506" target="_blank" rel="noopener noreferrer">Hieu Tran</a>
								</li>
								<li className="list-unstyled mb-2">
									<a href="https://www.facebook.com/tranducngoc1304" target="_blank" rel="noopener noreferrer">Trần Đức Ngọc</a>
								</li>
								<li className="list-unstyled mb-2">
									<a href="https://www.facebook.com/profile.php?id=100010107604217" target="_blank" rel="noopener noreferrer">Nguyễn Thành Thái</a>
								</li>
								<li className="list-unstyled mb-2">
									<a href="https://www.facebook.com/tekkiconz" target="_blank" rel="noopener noreferrer">Nguyễn Quang Huy</a>
								</li>
								<li className="list-unstyled mb-2">
									<a href="https://www.facebook.com/SevenGermany" target="_blank" rel="noopener noreferrer">Dương Ace</a>
								</li>
							</ul>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
				<div className="footer-copyright text-center py-3">
					<MDBContainer fluid>
						&copy; {new Date().getFullYear()} Copyright: <a
						href="/"> Market </a>
					</MDBContainer>
				</div>
			</MDBFooter>
		</>
	);
}

export default Footer;