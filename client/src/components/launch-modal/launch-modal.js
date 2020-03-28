import React, {useState} from 'react'
import {
    FileUploaderDropContainer,
    Modal,
    Select,
    SelectItem,
    TextInput
} from "carbon-components-react"

const LaunchModal = (
    {
        modalLabel,
        modalHeading,
        primaryButtonText,
        primaryButtonAction,
        secondaryButtonText,
        inputsText,
        select,
        open,
        setOpen,
        FileUploaderImage,
        defaultImage
    }) => {

    const [image, setImage] = useState(defaultImage || '')

    return (
        <Modal
            modalLabel={modalLabel}
            modalHeading={modalHeading}
            hasForm
            hasScrollingContent
            primaryButtonText={primaryButtonText}
            secondaryButtonText={secondaryButtonText}
            open={open}
            onRequestClose={() => setOpen(false)}
            onRequestSubmit={primaryButtonAction}
        >
            {
                inputsText.map(({id, labelText, value, onChange, invalid, invalidText}) => {
                    return (
                        <TextInput
                            key={id}
                            labelText={labelText}
                            id={id}
                            defaultValue={value}
                            onChange={onChange}
                            invalid={invalid}
                            invalidText={invalidText}
                        />
                    )
                })
            }
            <br/>

            {select && <Select id={select.id} labelText={select.labelText} defaultValue={select.defaultValue}>
                {select.selectItems.map(({value, text}) => (
                    <SelectItem key={value} value={value} text={text}/>
                ))}
            </Select>}

            {FileUploaderImage &&
                (image ?
                <img id="target" style={{height: '100px'}} src={image} alt="item"/> :
                <FileUploaderDropContainer accept={['.png', '.jpg']}
                                           onAddFiles={(e, {addedFiles}) => {
                                               console.log(addedFiles)
                                               const file = addedFiles[0]
                                               const reader = new FileReader()
                                               reader.onload = (e) => {
                                                   setImage(e.target.result)
                                               };
                                               reader.readAsDataURL(file);}}
                                           labelText="Drag and drop image(.png, .jpg) here or click to upload"
                                           id="uploader"
                />)}

        </Modal>
    )
}

export default LaunchModal