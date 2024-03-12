import React, { useState } from 'react'

function Qrcode() {
    const [image, setImage] = useState('qrcode.png')
    const [display, setDisplay] = useState(false)
    const [link, setLink] = useState('')
    const [size, setSize] = useState('150')
    async function genqrcode() {
        setDisplay(true)
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(link)}`
            setImage(url)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setDisplay(false)
        }
    }
    function download() {
        fetch(image)
        .then((res) => res.blob())
        .then((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'qrcode.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
    }
    return (
        <div className='container md-1 sm-1' >
            <div>
                <h1 className='head pt-2 pb-2'>QR code  generate</h1>
                {display && <p className='lable'>please wait....</p>}
                {image && <img className=' image mt-2 mb-2 ' src={image} alt='qrcode' />}
            </div>
            <div className='mt-3'>
                <label placeholder='enter link to convert' htmlFor="qrinput" className='lable'> Enter a link</label>
                <input id='qrinput' className='input' onChange={(e) => setLink(e.target.value)} />
            </div>
            <div className='mt-4'>
                <label className='lable' htmlFor='size'>Enter a size</label>
                <input placeholder='Size 100 to 300' id='size' className='input' onChange={(e) => setSize(e.target.value)} />
            </div>
            <div className='mb-3'>
                <button className=' m-4 btn btn-outline-primary' onClick={genqrcode} disabled={display}>generate a qrcode</button>
                <button className='m-4 btn btn-outline-primary' onClick={download}>downloade</button>
            </div>

        </div>

    )
}

export default Qrcode