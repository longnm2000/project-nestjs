const FooterComp: React.FC = () => {
  return (
    <>
      <footer className="bg-black">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-white py-8">
            <div>
              <a href="#" className="text-xl font-bold">
                Hà Nội Store{" "}
                <i className="fa-solid fa-circle-chevron-right"></i>
              </a>
              <p>
                Số 11 Đường Ven Sông Lừ, P. Kim Liên, Q. Đống Đa, TP. Hà Nội
              </p>
            </div>
            <div>
              <a href="#" className="text-xl font-bold">
                Hà Nội Store{" "}
                <i className="fa-solid fa-circle-chevron-right"></i>
              </a>
              <p>Số 11 ngõ 41 Đông Tác, P. Kim Liên, Q. Đống Đa, TP. Hà Nội</p>
            </div>
            <div>
              <a href="#" className="text-xl font-bold">
                Hồ Chí Minh Store{" "}
                <i className="fa-solid fa-circle-chevron-right"></i>
              </a>
              <p>Số 62 Đường Hoa Cau, Phường 7, Q. Phú Nhuận, TP. HCM</p>
            </div>
            <div>
              <a href="#" className="text-xl font-bold">
                Hồ Chí Minh Store{" "}
                <i className="fa-solid fa-circle-chevron-right"></i>
              </a>
              <p>
                Đường Đông Hưng Thuận 2, p, Tân Hưng Thuận, Quận 12. TP. HCM
              </p>
            </div>
          </div>
          <hr />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 py-8 text-white">
            <div>
              <img
                src="https://marshallstorevietnam.vn/wp-content/uploads/elementor/thumbs/385px-marshall-logo-white-q3l7aukndjdydkihrt19jw32tnjoj522yn29bfr020.png"
                alt=""
                className=" mb-4"
              />
              <p className="text-slate-300">
                Marshall Store Vietnam mong muốn đem đến những sản phẩm đẹp,
                chất lượng cùng những câu chuyện và những trải nghiệm mới mẻ cho
                khách hàng của mình với dịch vụ tốt nhất.
              </p>
            </div>
            <div>
              <h2 className="font-bold text-xl">Categories</h2>
              <ul>
                <li>
                  <a className="text-slate-300  hover:text-white" href="#">
                    Portable Speakers
                  </a>
                </li>
                <li>
                  <a className="text-slate-300  hover:text-white" href="#">
                    Home Speakers
                  </a>
                </li>

                <li>
                  <a className="text-slate-300  hover:text-white" href="#">
                    Headphones
                  </a>
                </li>
                <li>
                  <a className="text-slate-300  hover:text-white" href="#">
                    Phụ kiện Marshall
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-xl">Useful Links</h2>
              <ul>
                <li>
                  <a className="text-slate-300  hover:text-white" href="#">
                    Promotions
                  </a>
                </li>
                <li>
                  <a className="text-slate-300  hover:text-white" href="#">
                    Stores
                  </a>
                </li>

                <li>
                  <a className="text-slate-300  hover:text-white" href="#">
                    Our contacts
                  </a>
                </li>
                <li>
                  <a className="text-slate-300  hover:text-white" href="#">
                    Delivery & Return
                  </a>
                </li>
                <li>
                  <a className="text-slate-300  hover:text-white" href="#">
                    Outlet
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-xl">Useful Links</h2>
              <ul>
                <li>
                  <a className="text-slate-300  hover:text-white" href="#">
                    Blogs
                  </a>
                </li>
                <li>
                  <a className="text-slate-300  hover:text-white" href="#">
                    Our contacts
                  </a>
                </li>

                <li>
                  <a className="text-slate-300  hover:text-white" href="#">
                    Promotions
                  </a>
                </li>
                <li>
                  <a className="text-slate-300  hover:text-white" href="#">
                    Stores
                  </a>
                </li>
                <li>
                  <a className="text-slate-300  hover:text-white" href="#">
                    Delivery & Return
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-xl">MARSHALL STORE VIETNAM</h2>
              <p>Đại lý/ Dự án: 092.6562.888 Mail:</p>
              <p>marshallstorevietnam.vn@gmail.com</p>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-xl text-white">Subscribe</h2>
            <div className="flex gap-3 py-8 text-white text-2xl">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-square-twitter"></i>
              <i className="fa-brands fa-pinterest"></i>
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-telegram"></i>
            </div>
          </div>
          <hr />
          <div className="flex justify-between flex-wrap gap-4 py-8">
            <span className="text-white">
              <a href="#">Marshall Store Vietnam </a>
              <i className="fa-solid fa-copyright"></i>
              <span> 2023</span>
            </span>
            <img
              src="https://marshallstorevietnam.vn/wp-content/themes/woodmart/images/payments.png"
              alt=""
            />
          </div>
        </div>
      </footer>
    </>
  );
};
export default FooterComp;
