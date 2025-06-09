import styled from './styles/errorPage.module.css'

export default function ErrorPage() {
    return (
        <div className={styled.errorPage}>
            <p className={styled.pTag}>Something went wrong...</p>
        </div>
    )
}