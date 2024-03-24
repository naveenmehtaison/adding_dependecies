import  classes from './Input.css'
const Input  = (props)=>{
    return(  
        <div>

            <div
                className={`${classes.control} ${
                props.isvalid === false ? classes.invalid : ''
                }`}
            >
                <label htmlFor={props.id}>{props.label}</label>
                <input
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                />
            </div>
        </div>
    )
}
export default Input