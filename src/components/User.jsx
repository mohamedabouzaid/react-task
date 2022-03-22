import { useContext, useEffect, useState } from "react"
import { UsersContext } from "../App"
import { useParams } from "react-router-dom";

const User = () => {
    const {users} = useContext(UsersContext)
    const [user,setUser] = useState({})
    const {id} = useParams()

    useEffect(()=>{
        setUser(users.find((ele)=>ele.id === Number(id)))
    },[users,id])
    return <>
        <section>
            <div className="container-xl py-5">
                <div className="row">
                    <div className="col-4">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    alt="avatar" className="rounded-circle img-fluid" width={'150px'} />
                                <h5 className="my-3">{user?.name}</h5>
                                <p className="text-muted mb-4">{user?.address?.city}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Name</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{user?.name}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Email</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{user?.email}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Phone</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{user?.phone}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Address</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{user?.address?.city}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default User