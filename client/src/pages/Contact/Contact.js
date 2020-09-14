import React from "react";
import {MDBCardBody, MDBContainer, MDBRow,} from "mdbreact";
import {Helmet} from "react-helmet";

import NavBar from "../../components/Navigation/NavBar/NavBar";
import Jumbotron from "../../components/Layout/UI/Jumbotron/Jumbotron";
import Person from "./Person/Person";
import HieuImg from "../../assets/images/Hieu.jpg";
import HuyImg from "../../assets/images/Huy.jpg";
import ThaiImg from "../../assets/images/Thai.png";
import NgocImg from "../../assets/images/Ngoc.jpg";
import DuongImg from "../../assets/images/Duong.jpg";

const Contact = () => {
	return (
		<>
			<Helmet>
				<title>Đội ngũ hỗ trợ</title>
			</Helmet>
			<header>
				<NavBar isFixed="top"/>
			</header>
			<Jumbotron title="Hỗ trợ" classname="jumbotron-img"/>
			<main>
				<MDBContainer className="px-1 text-center">
					<MDBCardBody>
						<h2 className="h1-responsive font-weight-bold mt-5">
							Đội ngũ của chúng tôi
						</h2>
						<h5 className="grey-text w-responsive mx-auto mb-5">
							Nhóm BTL OOP IT2-02 K63
						</h5>
						<MDBRow>
							<Person
								md="4"
								name="Hiếu"
								img={HieuImg}
								role="Coder BE & FE"
								hasFacebook={true}
								hasTwitter={true}
								hasGithub={true}
								facebook="https://www.facebook.com/profile.php?id=100006300518506"
								twitter="https://twitter.com/Hieutran3003200"
								github="https://github.com/Wizard2069"
							/>
							<Person
								md="4"
								name="Huy"
								img={HuyImg}
								role="Inspect các website"
								hasFacebook={true}
								hasTwitter={false}
								hasGithub={false}
								facebook="https://www.facebook.com/tekkiconz"
							/>
							<Person
								md="4"
								name="Thái"
								img={ThaiImg}
								role="Tester"
								hasFacebook={true}
								hasTwitter={false}
								hasGithub={false}
								facebook="https://www.facebook.com/profile.php?id=100010107604217"
							/>
						</MDBRow>
						<MDBRow>
							<Person
								md="6"
								name="Ngọc"
								img={NgocImg}
								role="Thiết kế cấu trúc các module, cấu trúc cơ sở dữ liệu"
								hasFacebook={true}
								hasTwitter={false}
								hasGithub={false}
								facebook="https://www.facebook.com/tranducngoc1304"
							/>
							<Person
								md="6"
								name="Dương"
								img={DuongImg}
								role="Xử lý chuỗi, xâu, ngày tháng sau khi fetch data từ api"
								hasFacebook={true}
								hasTwitter={false}
								hasGithub={false}
								facebook="https://www.facebook.com/SevenGermany"
							/>
						</MDBRow>
					</MDBCardBody>
				</MDBContainer>
			</main>
		</>
	);
};

export default Contact;