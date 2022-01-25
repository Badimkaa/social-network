import styles from './Paginator.module.css'
import React, { FC, useState } from 'react'

type PropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalItemsCount: number
    pageSize: number
    portionSize?: number
}
const Paginator: FC<PropsType> = ({ currentPage, onPageChanged,
    totalItemsCount, pageSize, portionSize = 20 }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize
    return (
        <div className={styles.paginator}>
            {portionNumber > 1 && <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}
            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map(p => {
                return <span onClick={() => onPageChanged(p)} className={currentPage === p ? `${styles.activePage} ${styles.pageNumber}` : styles.pageNumber}>{p}</span>
            })}
            {portionCount > portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT </button>}
        </div >
    )
}


export default Paginator