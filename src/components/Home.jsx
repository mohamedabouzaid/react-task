import {  useContext, useEffect, useState } from "react";
import Auth from "../auth/auth";
import axios from "axios";
import { Button, Table, Modal } from "react-bootstrap";
import { UsersContext } from "../App";
import { Link } from "react-router-dom";
import FormTemp from "./FormTemp";

const Home = () => {
	const {users,setUsers} = useContext(UsersContext)
	const [isAdmin, setAdmin] = useState(false)
	const [showDelete, setShowDelete] = useState(false);
	const [userInfo, setUser] = useState({});

	const handleAdd = (childData)=>{
		setUsers((oldUsers)=>([...oldUsers,childData]))
	}

	const handleEdit = (childData)=>{
		setUsers(()=>([...childData]))
	}
	
	const handleDelete = () =>{
		setUsers((oldUsers)=>(oldUsers.filter(ele=>ele.id!==userInfo.id)))
		setShowDelete(false);
	}
	useEffect(() => {
		Auth.checkAdmin().then((res) => {
			setAdmin(res.data.Admin)
		})
		axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
			setUsers(res.data);
		});
	}, [setUsers])
	return (
		<>
			<UsersContext.Provider value={users}>
				<Table   striped bordered hover variant="dark" >
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Number</th>
							<th>Address</th>
							<th>Address</th>
							{isAdmin ? <th>
								<FormTemp formType={'Add'} users={users} setUsers={handleAdd}/>
							</th> : null}
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id}>
									{/* <Link to="/user"> */}
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>{user.phone}</td>
									<td>{user.address.city}</td>
									<td><Button variant="secondary"><Link to={`/user/${user.id}`}>Detail</Link></Button></td>
									{isAdmin ? <td>
										<FormTemp user={user} formType={'Edit'} users={users} setUsers={handleEdit}/>
										<div className="vr" />
										<Button variant="danger" onClick={() => { setUser(user); setShowDelete(true); }}>Delete</Button>
										<Modal show={showDelete} onHide={() => {setShowDelete(false)}}>
											<Modal.Header closeButton>
												<Modal.Title>Confirm</Modal.Title>
											</Modal.Header>
											<Modal.Body>sure you want to delete {userInfo.name}</Modal.Body>
											<Modal.Footer>
												<Button variant="secondary" onClick={() => {setShowDelete(false)}}>
													Close
												</Button>
												<Button variant="danger" onClick={handleDelete}>
													Delete
												</Button>
											</Modal.Footer>
										</Modal>
									</td> : null}
							{/* </Link> */}
								</tr>
						))}
					</tbody>
				</Table>
			</UsersContext.Provider>
		</>
	);
};

export default Home;