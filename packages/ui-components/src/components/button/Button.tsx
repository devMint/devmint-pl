import styles from './Button.module.css'

export type ButtonProps = React.PropsWithChildren<{
  onClick?: () => void
}>

export function Button({ onClick, children }: ButtonProps) {
  return (
    <button onClick={onClick} className={styles['Button']}>
      {children}
    </button>
  )
}
