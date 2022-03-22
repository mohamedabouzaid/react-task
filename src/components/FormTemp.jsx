
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Button, Modal } from "react-bootstrap";
import { useFormik } from 'formik';

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.phone) {
        errors.phone = 'Required';
    }

    if (!values.address) {
        errors.address = 'Required';
    }

    return errors;
};
const FormTemp = (props) => {
    const [userInfo] = useState(props.user)
    const [showForm, setShowForm] = useState(false);
    const myFormik = useFormik({
        initialValues: {
            name: userInfo?.name || '',
            email: userInfo?.email || '',
            phone: userInfo?.phone || '',
            address: userInfo?.address?.city || ''
        },
        validate,
        onSubmit: values => {
            switch (props.formType) {
                case 'Edit':
                    for(let i = 0;i < props.users?.length;i++){
                        if(userInfo.id === props.users[i]?.id){
                            props.users[i].name = values.name;
                            props.users[i].email = values.email;
                            props.users[i].phone = values.phone;
                            props.users[i].address.city = values.address;
                        }
                    }
                    props.setUsers(props.users)
                    break;
                case 'Add':
                    props.setUsers({id:props.users.length+1,...values,address:{city:values.address}})
                    break;
                default:
                }
			myFormik.resetForm()
			setShowForm(false)
    },
        onReset: () => {
            setShowForm(false)
        }
	})
return <>
    <Button variant="primary" onClick={() => { setShowForm(true); }}>{props.formType}</Button>
    <Modal show={showForm} onHide={() => setShowForm(false)} >
        <Modal.Header closeButton>
            <Modal.Title>Update User Information</Modal.Title>
        </Modal.Header>
        <Form onSubmit={myFormik.handleSubmit} className="p-2">
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Name</Form.Label>
                <Form.Control className={myFormik.touched.name && myFormik.errors.name ? "is-invalid" : ''} required type="text" name="name" placeholder="Name" onChange={myFormik.handleChange} onBlur={myFormik.handleBlur}
                    value={myFormik.values.name} autoComplete="on" />
                {myFormik.touched.name && myFormik.errors.name ? <div className="text-danger">{myFormik.errors.name}</div> : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control className={myFormik.touched.email && myFormik.errors.email ? "is-invalid" : ''} type="email" name="email" placeholder="Email" onChange={myFormik.handleChange} onBlur={myFormik.handleBlur}
                    value={myFormik.values.email} autoComplete="on" />
                {myFormik.touched.email && myFormik.errors.email ? <div className="text-danger">{myFormik.errors.email}</div> : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control className={myFormik.touched.phone && myFormik.errors.phone ? "is-invalid" : ''} type="text" name="phone" onChange={myFormik.handleChange} onBlur={myFormik.handleBlur}
                    value={myFormik.values.phone} placeholder="phone" autoComplete="on" />
                {myFormik.touched.phone && myFormik.errors.phone ? <div className="text-danger">{myFormik.errors.phone}</div> : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control className={myFormik.touched.address && myFormik.errors.address ? "is-invalid" : ''} type="text" name="address" placeholder="address" onChange={myFormik.handleChange} onBlur={myFormik.handleBlur}
                    value={myFormik.values.address} autoComplete="on" />
                {myFormik.touched.address && myFormik.errors.address ? <div className="text-danger">{myFormik.errors.address}</div> : null}
            </Form.Group>
            <Modal.Footer>
                <Button variant="primary" type="submit">
                    Save
                </Button>
                <Button type="reset" variant="secondary" onClick={myFormik.handleReset}>
                    Close
                </Button>
            </Modal.Footer>
        </Form>
    </Modal>
</>
}

export default FormTemp
