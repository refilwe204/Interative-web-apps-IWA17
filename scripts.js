// scripts.js

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

const createData = () => {
  const current = new Date();
  current.setDate(1);
  const startDay = current.getDay(); // get the day of the week for the first day of the month
  const daysInMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate(); // get the total number of days in the month

  let days = [];
  let weeks = [];
  let day = 1;

  for (let i = 0; i < startDay; i++) {
    days.push(null); // fill in empty cells for days before the first day of the month
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i); // add each day of the month to the days array
  }

  while (day <= daysInMonth) {
    weeks.push(days.slice(day - 1, day + 6)); // slice the days array to create a week and add it to the weeks array
    day += 7;
  }

  return weeks;
};

const createCell = (day, isToday) => {
  const cell = document.createElement('td');
  cell.classList.add('table__cell');

  if (day !== null) {
    cell.innerText = day;
    if (isToday) {
      cell.classList.add('table__cell_today');
    }
  } else {
    cell.classList.add('table__cell_blank');
  }

  return cell;
};

const createHtml = () => {
  const content = document.querySelector('[data-content]');
  const weeks = createData();

  for (let i = 0; i < weeks.length; i++) {
    const week = weeks[i];
    const row = document.createElement('tr');

    for (let j = 0; j < week.length; j++) {
      const day = week[j];
      const isToday = day === new Date().getDate() && new Date().getMonth() === new Date().getMonth();

      row.appendChild(createCell(day, isToday));
    }

    content.appendChild(row);
  }

  const title = document.querySelector('[data-title]');
  title.innerText = `${MONTHS[new Date().getMonth()]} ${new Date().getFullYear()}`;
};

createHtml();
