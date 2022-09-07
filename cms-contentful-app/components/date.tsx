import { format } from 'date-fns'

const DateComponent = ({ dateString }) => {
  return (
    <time dateTime={dateString}>
      {format(new Date(dateString), 'LLLL	d, yyyy')}
    </time>
  )
}

export default DateComponent
