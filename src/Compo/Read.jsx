import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal , Input } from 'antd';


const Read = () => {
    const [rows, setRows] = useState([])
    const [rowid, setstateid] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [edit, setedit] = useState({})
    const [search, setsearch] = useState()

    const handleOk = () => {
        setIsModalVisible(false);
        console.log(edit)
        console.log(rowid)
        axios.put(`https://6206272f92dd6600171c0867.mockapi.io/crud-operation/${rowid}`, edit).then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    };

    const handlechagne = (ele) => {
        setedit({ ...edit, [ele.target.name]: ele.target.value })
    }

    useEffect(() => {
        axios.get('https://6206272f92dd6600171c0867.mockapi.io/crud-operation').then(data => {
            setRows(data['data'])
        }).catch(err => {
            console.log(err)
        })
    }, [rows])


    const del = (id) => {

        axios.delete(`https://6206272f92dd6600171c0867.mockapi.io/crud-operation/${id}`)
            .then(res => {
                console.log(res);
                alert("detail deleted")
            })
    }

    const handleedit = (id, ele) => {
        setIsModalVisible(true);
        setedit(ele)
        setstateid(id)

    }


    function datasearch(e) {
        e.preventDefault();
        setRows(rows.filter((ele) => {
            if (
                ele.fname.toLowerCase() === search.toLowerCase() || ele.lname.toLowerCase() === search.toLowerCase() || ele.email.toLowerCase() === search.toLowerCase()
            ) {
                console.log(ele)
                return ele;
            }
        }))
    }

    return (
        <>
            <div>
                <div className="search-menu">
                <b><button className='btn-dark mx-3' id="blue-btn" onClick={datasearch}>Search</button></b>

                <input className='form-control' id='search-box' onChange={(event) => setsearch(event.target.value)} style={{ border: "2px solid black" }} type="search" placeholder='search-details' />
                </div>
                <h3 className='text-center mt-5'><marquee>SHOW DATA</marquee></h3>
                <div className="container-fluid">
                    <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((ele, i) => {
                                return (
                                    <tr key={i}>
                                        <td >
                                            {ele.fname}
                                        </td>
                                        <td >
                                            {ele.lname}
                                        </td>

                                        <td >
                                            {ele.email}
                                        </td>

                                        <td >
                                            <button onClick={() => del(ele.id)} className='btn btn-primary mx-2'>Delete</button>
                                            <button onClick={() => handleedit(ele.id, ele)} className='btn btn-danger'>Edit</button>
                                        </td>
                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>
                </div>
            </div>

            <Modal title="Update Box" visible={isModalVisible} onOk={handleOk}>
                <label>FirstName</label><Input onChange={handlechagne} value={edit.fname} name='fname' size="large" />
                <label>LastName</label><Input onChange={handlechagne} value={edit.lname} name='lname' size="large" />
                <label>Email</label><Input onChange={handlechagne} value={edit.email} name='email' size="large" type='email' />
            </Modal>
        </>
    )
}

export default Read