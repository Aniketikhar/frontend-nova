import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
        <div className="container-fluid p-5">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
            <div className="page-content page-container " id="page-content">
              <div className="padding">
                <div className=" ">
                  <div className="">
                    <div className="card user-card-full">
                      <div className="row m-l-0 m-r-0">
                        <div className="col-sm-4 bg-c-lite-green user-profile">
                          <div className="card-block text-center text-white">
                            <div className="m-b-25">
                              <img
                                src="https://img.icons8.com/bubbles/100/000000/user.png"
                                className="img-radius"
                                alt="User-Profile-Image"
                              />
                            </div>
                            <h6 className="f-w-600">{auth?.user?.name}</h6>
                            <p>Admin</p>
                            <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
                          </div>
                        </div>
                        <div className="col-sm-8">
                          <div className="card-block">
                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                              Information
                            </h6>
                            <div className="row">
                              <div className="col-sm-6 mb-3">
                                <p className="m-b-10 f-w-600">Name</p>
                                <h6 className="text-muted f-w-400">
                                  {auth?.user?.name}
                                </h6>
                              </div>
                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Email</p>
                                <h6 className="text-muted f-w-400">
                                  {auth?.user?.email}
                                </h6>
                              </div>
                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Phone</p>
                                <h6 className="text-muted f-w-400">
                                  {auth?.user?.phone}
                                </h6>
                              </div>

                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Address</p>
                                <h6 className="text-muted f-w-400">
                                  {auth?.user?.address}
                                </h6>
                              </div>
                            </div>

                            <ul className="social-link list-unstyled m-t-40 m-b-10">
                              <li>
                                <a
                                  href="#!"
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title
                                  data-original-title="facebook"
                                  data-abc="true"
                                >
                                  <i
                                    className="mdi mdi-facebook feather icon-facebook facebook"
                                    aria-hidden="true"
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#!"
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title
                                  data-original-title="twitter"
                                  data-abc="true"
                                >
                                  <i
                                    className="mdi mdi-twitter feather icon-twitter twitter"
                                    aria-hidden="true"
                                  />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#!"
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title
                                  data-original-title="instagram"
                                  data-abc="true"
                                >
                                  <i
                                    className="mdi mdi-instagram feather icon-instagram instagram"
                                    aria-hidden="true"
                                  />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

    </Layout>
  )
  }

export default AdminDashboard
