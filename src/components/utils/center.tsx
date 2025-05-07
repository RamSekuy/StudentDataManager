type Props = {
  children?: React.ReactNode,
  vertical?: boolean,
  horizontal?: boolean,
}

export default function Center({children,vertical=false,horizontal=false}:Props) {
  return (
    <div className={`p-4 h-full flex-col flex ${!vertical&&"justify-center"} ${!horizontal&&"items-center"}`}>{children}</div>
  )
}
