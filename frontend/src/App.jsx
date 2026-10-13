import { useMemo, useState } from 'react'
import './App.css'

const offeringCategories = [
  'Sunday Offering',
  'Tithe',
  'Thanksgiving Offering',
  'Special Offering',
  'Other Donations',
]

const expenseCategories = [
  'Utilities',
  'Maintenance',
  'Cleaning',
  'Transport',
  'Charity',
  'Equipment',
  'Other',
]

const paymentMethods = ['Cash', 'Bank Transfer', 'Mobile Money']
const serviceOptions = ['Sunday Morning Service', 'Evening Service', 'Special Event']
const pastorName = 'Mutabazi'
const adminCredentials = {
  email: import.meta.env.VITE_ADMIN_EMAIL || 'pastor@church.local',
  password: import.meta.env.VITE_ADMIN_PASSWORD || 'change-me',
}

const labels = {
  en: {
    dashboard: 'Dashboard',
    members: 'Participants',
    offering: 'New Offering',
    expense: 'New Expense',
    history: 'Transactions',
    weekly: 'Weekly Summary',
    reports: 'Reports',
    settings: 'Settings',
    audit: 'Audit Log',
    churchAdmin: 'Church administration',
    title: 'Weekly offering dashboard',
    logout: 'Logout',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    english: 'English',
    kinyarwanda: 'Kinyarwanda',
    churchFinance: 'Church finance',
    pastorSecure: 'Pastor secure access',
    email: 'Email address',
    password: 'Password',
    login: 'Login',
    thisWeekIncome: 'This week income',
    thisMonthIncome: 'This month income',
    thisYearIncome: 'This year income',
    thisWeekExpenses: 'This week expenses',
    availableBalance: 'Available balance',
    transactionsThisWeek: 'Transactions this week',
    weeklyOfferings: 'Weekly offerings',
    lastSixWeeks: 'Last 6 weeks',
    incomeVsExpenses: 'Income vs expenses',
    current: 'Current',
    recentTransactions: 'Recent transactions',
    viewAll: 'View all',
    type: 'Type',
    category: 'Category',
    amount: 'Amount',
    date: 'Date',
    action: 'Action',
    financeAlerts: 'Finance alerts',
    weeklyNetBalance: 'Weekly net balance',
    healthyGiving: 'Healthy giving pattern this week.',
    warningText: 'Warning: Expense spend is above current week income.',
    openingBalance: 'Opening balance',
    addParticipant: 'Add participant',
    participantList: 'Church participants',
    fullName: 'Full name',
    phone: 'Phone number',
    gender: 'Gender',
    address: 'Address',
    role: 'Role in church',
    status: 'Status',
    joinDate: 'Join date',
    memberSearchPlaceholder: 'Search participant name or phone',
    allStatuses: 'All statuses',
    saveParticipant: 'Save participant',
    noParticipants: 'No church participants have been added yet.',
    noParticipantsMatch: 'No participants match the current filters.',
    recordNewOffering: 'Record new offering',
    offeringCategory: 'Offering category',
    amountRwf: 'Amount (RWF)',
    dateReceived: 'Date received',
    timeReceived: 'Time received',
    recordedBy: 'Recorded by',
    serviceEvent: 'Service / event',
    paymentMethod: 'Payment method',
    description: 'Description',
    notes: 'Notes',
    saveOffering: 'Save offering',
    recordNewExpense: 'Record new expense',
    expenseCategory: 'Expense category',
    dateSpent: 'Date spent',
    timeSpent: 'Time spent',
    serviceOperation: 'Service / operation',
    saveExpense: 'Save expense',
    transactionHistory: 'Transaction history',
    searchPlaceholder: 'Search ID, category, description or recorder',
    allTypes: 'All types',
    income: 'Income',
    expense: 'Expense',
    allCategories: 'All categories',
    noTransactions: 'No transactions match the current filters.',
    previous: 'Previous',
    next: 'Next',
    page: 'Page',
    of: 'of',
    monthlyAnnualSummary: 'Monthly and annual summary',
    totalIncome: 'Total income',
    totalExpenses: 'Total expenses',
    netBalance: 'Net balance',
    categoryBreakdown: 'Category breakdown',
    weeklyOfferingSchedule: 'Weekly offering schedule',
    noOfferingData: 'No offering data for the current week yet.',
    weeklyTotalIncome: 'Weekly total income',
    administratorSettings: 'Administrator settings',
    openingBalanceLabel: 'Opening balance (RWF)',
    reportingWeek: 'Reporting week starts on',
    saveSettings: 'Save settings',
    auditLog: 'Audit log',
    offeringSystem: 'Offering System',
    delete: 'Delete',
    alertWarning: 'Warning',
    alertHealthy: 'Healthy giving pattern this week.',
  },
  rw: {
    dashboard: 'Dashboard',
    members: 'Abitabiriye',
    offering: 'Ishimwe rishya',
    expense: 'Kwishyura gishya',
    history: 'Amakuru',
    weekly: 'Umusaruro w’icyumweru',
    reports: 'Raporo',
    settings: 'Igenamiterere',
    audit: 'Amakuru y’ivyakozwe',
    churchAdmin: 'Ubuyobozi bw’itorero',
    title: 'Dashboard y’amafaranga y’icyumweru',
    logout: 'Gusohoka',
    language: 'Ururimi',
    theme: 'Ubwoko bw’ijuru',
    light: 'Umucyo',
    dark: 'Umwijima',
    english: 'Icyongereza',
    kinyarwanda: 'Kinyarwanda',
    churchFinance: 'Imari y’itorero',
    pastorSecure: 'Kwinjira kw’umupastori',
    email: 'Imeyiri',
    password: 'Ijambo ry’ibanga',
    login: 'Injira',
    thisWeekIncome: 'Ishimwe ry’icyumweru',
    thisMonthIncome: 'Ishimwe ry’ukwezi',
    thisYearIncome: 'Ishimwe ry’umwaka',
    thisWeekExpenses: 'Amabere y’icyumweru',
    availableBalance: 'Amafaranga asigaye',
    transactionsThisWeek: 'Ibikorwa by’icyumweru',
    weeklyOfferings: 'Ishimwe ry’icyumweru',
    lastSixWeeks: 'Ibyumweru 6 bishize',
    incomeVsExpenses: 'Ishimwe vs amabere',
    current: 'Iriho',
    recentTransactions: 'Ibikorwa bya vuba',
    viewAll: 'Reba byose',
    type: 'Ubwoko',
    category: 'Icyiciro',
    amount: 'Amafaranga',
    date: 'Itariki',
    action: 'Igikorwa',
    financeAlerts: 'Ibimenyetso by’imari',
    weeklyNetBalance: 'Ishimwe ryo mu cyumweru',
    healthyGiving: 'Ibikorwa by’amafaranga bimeze neza muri uyu cyumweru.',
    warningText: 'Ibuza: Amabere arenga ishimwe ry’icyumweru.',
    openingBalance: 'Amafaranga yatangiye',
    addParticipant: 'Shyiramo uwitabiriye',
    participantList: 'Abitabiriye itorero',
    fullName: 'Amazina yose',
    phone: 'Numero ya telefone',
    gender: 'Igitsina',
    address: 'Aho atuye',
    role: 'Uruhare muri itorero',
    status: 'Imiterere',
    joinDate: 'Itariki yinjiriye',
    memberSearchPlaceholder: 'Shakisha izina cyangwa telefone y’uwitabiriye',
    allStatuses: 'Imiterere yose',
    saveParticipant: 'Bika uwitabiriye',
    noParticipants: 'Nta bitabiriye b’itorero byongewe.',
    noParticipantsMatch: 'Nta bitabiriye bihuye n’ibi byahiswemo.',
    recordNewOffering: 'Andika ishimwe rishya',
    offeringCategory: 'Ubwoko bw’ishimwe',
    amountRwf: 'Amafaranga (RWF)',
    dateReceived: 'Itariki yakiriwe',
    timeReceived: 'Igihe cyakiriwe',
    recordedBy: 'Yanditswe na',
    serviceEvent: 'Service / ikoraniro',
    paymentMethod: 'Uburyo bwo kwishyura',
    description: 'Ibisobanuro',
    notes: 'Inyandiko',
    saveOffering: 'Bika ishimwe',
    recordNewExpense: 'Andika amabere mashya',
    expenseCategory: 'Ubwoko bw’amabere',
    dateSpent: 'Itariki yishyuwe',
    timeSpent: 'Igihe cyishyuwe',
    serviceOperation: 'Service / ibikorwa',
    saveExpense: 'Bika amabere',
    transactionHistory: 'Amateka y’ibikorwa',
    searchPlaceholder: 'Shakisha ID, icyiciro, ibisobanuro cyangwa wanditse',
    allTypes: 'Ubwoko bwose',
    income: 'Ishimwe',
    expense: 'Amabere',
    allCategories: 'Ibyiciro byose',
    noTransactions: 'Nta bikorwa bihuye n’ibi byahiswemo.',
    previous: 'Ibanza',
    next: 'Ikurikira',
    page: 'Urupapuro',
    of: 'ku',
    monthlyAnnualSummary: 'Ingaruka z’ukwezi na umwaka',
    totalIncome: 'Ishimwe ryose',
    totalExpenses: 'Amabere yose',
    netBalance: 'Amafaranga asigaye',
    categoryBreakdown: 'Ibyiciro by’amafaranga',
    weeklyOfferingSchedule: 'Gahunda y’ishimwe ry’icyumweru',
    noOfferingData: 'Nta shimwe ry’icyumweru riraboneka.',
    weeklyTotalIncome: 'Ishimwe ryose ry’icyumweru',
    administratorSettings: 'Igenamiterere ry’umuyobozi',
    openingBalanceLabel: 'Amafaranga yatangiye (RWF)',
    reportingWeek: 'Icyumweru cyo gutangazaho gitangira ku',
    saveSettings: 'Bika igenamiterere',
    auditLog: 'Amakuru y’ivyakozwe',
    offeringSystem: 'Sisitemu y’ishimwe',
    delete: 'Siba',
    alertWarning: 'Iburira',
    alertHealthy: 'Ibikorwa by’amafaranga bimeze neza muri uyu cyumweru.',
  },
}

const initialTransactions = []

const initialParticipants = []

const initialAudit = []

const defaultSettings = {
  openingBalance: 2500000,
  reportingWeekStartsOn: 'Monday',
}

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    maximumFractionDigits: 0,
  }).format(value)

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

const formatShortDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  })

const getStartOfWeek = (date) => {
  const result = new Date(date)
  const day = result.getDay()
  const diff = day === 0 ? -6 : 1 - day
  result.setDate(result.getDate() + diff)
  result.setHours(0, 0, 0, 0)
  return result
}

const buildId = (prefix) => `${prefix}-${Math.floor(Math.random() * 9000 + 1000)}`

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeView, setActiveView] = useState('dashboard')
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('en')
  const [transactions, setTransactions] = useState(initialTransactions)
  const [participants, setParticipants] = useState(initialParticipants)
  const [settings, setSettings] = useState(defaultSettings)
  const [auditLog, setAuditLog] = useState(initialAudit)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
    startDate: '',
    endDate: '',
  })
  const [page, setPage] = useState(1)
  const [offeringForm, setOfferingForm] = useState({
    category: 'Sunday Offering',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    time: '09:00',
    recordedBy: pastorName,
    service: 'Sunday Morning Service',
    description: '',
    paymentMethod: 'Cash',
    notes: '',
  })
  const [expenseForm, setExpenseForm] = useState({
    category: 'Utilities',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    time: '09:00',
    recordedBy: pastorName,
    service: 'Church Operations',
    description: '',
    paymentMethod: 'Bank Transfer',
    notes: '',
  })
  const [memberForm, setMemberForm] = useState({
    fullName: '',
    phone: '',
    gender: 'Male',
    address: '',
    role: 'Member',
    status: 'Active',
    joinDate: new Date().toISOString().slice(0, 10),
  })
  const [memberFilters, setMemberFilters] = useState({
    search: '',
    status: 'all',
  })

  const monthIncome = useMemo(
    () => transactions.filter((tx) => tx.type === 'income' && new Date(tx.date).getMonth() === new Date().getMonth()).reduce((sum, tx) => sum + tx.amount, 0),
    [transactions],
  )

  const yearIncome = useMemo(
    () => transactions.filter((tx) => tx.type === 'income' && new Date(tx.date).getFullYear() === new Date().getFullYear()).reduce((sum, tx) => sum + tx.amount, 0),
    [transactions],
  )

  const currentWeekStart = getStartOfWeek(new Date())
  const currentWeekIncome = transactions.filter(
    (tx) =>
      tx.type === 'income' &&
      new Date(tx.date) >= currentWeekStart &&
      new Date(tx.date) <= new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000),
  ).reduce((sum, tx) => sum + tx.amount, 0)

  const currentWeekExpenses = transactions.filter(
    (tx) =>
      tx.type === 'expense' &&
      new Date(tx.date) >= currentWeekStart &&
      new Date(tx.date) <= new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000),
  ).reduce((sum, tx) => sum + tx.amount, 0)

  const totalExpenses = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const totalIncome = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const currentBalance = settings.openingBalance + totalIncome - totalExpenses
  const weeklyNetBalance = currentWeekIncome - currentWeekExpenses

  const filteredTransactions = useMemo(() => {
    const searchValue = filters.search.toLowerCase()
    return transactions
      .filter((tx) => {
        const matchesSearch =
          !searchValue ||
          tx.id.toLowerCase().includes(searchValue) ||
          tx.category.toLowerCase().includes(searchValue) ||
          tx.description.toLowerCase().includes(searchValue) ||
          tx.recordedBy.toLowerCase().includes(searchValue)

        const matchesType = filters.type === 'all' || tx.type === filters.type
        const matchesCategory = filters.category === 'all' || tx.category === filters.category
        const matchesStart = !filters.startDate || tx.date >= filters.startDate
        const matchesEnd = !filters.endDate || tx.date <= filters.endDate

        return matchesSearch && matchesType && matchesCategory && matchesStart && matchesEnd
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [transactions, filters])

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / 5))
  const paginatedTransactions = filteredTransactions.slice((page - 1) * 5, page * 5)

  const filteredParticipants = useMemo(() => {
    const searchValue = memberFilters.search.toLowerCase()

    return participants.filter((person) => {
      const matchesSearch =
        !searchValue ||
        person.fullName.toLowerCase().includes(searchValue) ||
        person.phone.toLowerCase().includes(searchValue) ||
        person.role.toLowerCase().includes(searchValue)

      const matchesStatus = memberFilters.status === 'all' || person.status === memberFilters.status

      return matchesSearch && matchesStatus
    })
  }, [participants, memberFilters])

  const weeklyChartData = useMemo(() => {
    const values = []
    const now = new Date()

    for (let weeksBack = 5; weeksBack >= 0; weeksBack -= 1) {
      const start = new Date(now)
      start.setDate(now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1) - weeksBack * 7)
      start.setHours(0, 0, 0, 0)

      const end = new Date(start)
      end.setDate(start.getDate() + 6)

      const income = transactions
        .filter((tx) => tx.type === 'income' && new Date(tx.date) >= start && new Date(tx.date) <= end)
        .reduce((sum, tx) => sum + tx.amount, 0)

      const expense = transactions
        .filter((tx) => tx.type === 'expense' && new Date(tx.date) >= start && new Date(tx.date) <= end)
        .reduce((sum, tx) => sum + tx.amount, 0)

      values.push({
        label: `W${6 - weeksBack}`,
        income,
        expense,
      })
    }

    return values
  }, [transactions])

  const workspaceSpend = useMemo(() => {
    const totals = {}
    transactions.forEach((tx) => {
      totals[tx.category] = (totals[tx.category] || 0) + (tx.type === 'income' ? tx.amount : -tx.amount)
    })
    return Object.entries(totals).map(([name, value]) => ({ name, value: Math.abs(value) }))
  }, [transactions])

  const weeklyServiceTotals = useMemo(() => {
    const map = new Map()

    transactions
      .filter((tx) => tx.type === 'income' && new Date(tx.date) >= currentWeekStart)
      .forEach((tx) => {
        const key = tx.service || 'General Service'
        map.set(key, (map.get(key) || 0) + tx.amount)
      })

    return [...map.entries()].map(([service, amount]) => ({ service, amount }))
  }, [transactions, currentWeekStart])

  const addAuditEntry = (message) => {
    const record = {
      id: buildId('AUD'),
      action: message,
      by: pastorName,
      timestamp: new Date().toLocaleString('sv-SE').replace('T', ' '),
    }

    setAuditLog((current) => [record, ...current])
  }

  const handleLogin = (event) => {
    event.preventDefault()

    if (!loginForm.email || !loginForm.password) {
      setError('Please enter your email and password.')
      return
    }

    const valid =
      loginForm.email.toLowerCase() === adminCredentials.email.toLowerCase() &&
      loginForm.password === adminCredentials.password

    if (!valid) {
      setError('Invalid login. Please check the pastor credentials.')
      return
    }

    setError('')
    setNotice(`Access granted. Welcome back, Pastor ${pastorName}.`)
    setIsAuthenticated(true)
    addAuditEntry('Successfully logged in')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setActiveView('dashboard')
    addAuditEntry('Logged out')
    setNotice('You have been logged out securely.')
  }

  const handleOfferingSubmit = (event) => {
    event.preventDefault()

    if (!offeringForm.category || !offeringForm.amount || !offeringForm.date || !offeringForm.time || !offeringForm.recordedBy) {
      setError('Please complete all required offering fields.')
      return
    }

    const amount = Number(offeringForm.amount)

    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Offering amount must be greater than zero.')
      return
    }

    const newTransaction = {
      id: buildId('INC'),
      type: 'income',
      category: offeringForm.category,
      amount,
      date: offeringForm.date,
      time: offeringForm.time,
      recordedBy: offeringForm.recordedBy,
      service: offeringForm.service,
      description: offeringForm.description || 'New offering entry',
      paymentMethod: offeringForm.paymentMethod,
      notes: offeringForm.notes,
      createdAt: new Date(`${offeringForm.date}T${offeringForm.time}`).toISOString(),
    }

    setTransactions((current) => [newTransaction, ...current])
    setActiveView('dashboard')
    setNotice('Offering successfully recorded.')
    setError('')
    setOfferingForm({
      category: 'Sunday Offering',
      amount: '',
      date: new Date().toISOString().slice(0, 10),
      time: '09:00',
      recordedBy: pastorName,
      service: 'Sunday Morning Service',
      description: '',
      paymentMethod: 'Cash',
      notes: '',
    })
    addAuditEntry(`Recorded ${newTransaction.category} amount ${formatCurrency(amount)}`)
  }

  const handleExpenseSubmit = (event) => {
    event.preventDefault()

    if (!expenseForm.category || !expenseForm.amount || !expenseForm.date || !expenseForm.time || !expenseForm.recordedBy) {
      setError('Please complete all required expense fields.')
      return
    }

    const amount = Number(expenseForm.amount)

    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Expense amount must be greater than zero.')
      return
    }

    const newTransaction = {
      id: buildId('EXP'),
      type: 'expense',
      category: expenseForm.category,
      amount,
      date: expenseForm.date,
      time: expenseForm.time,
      recordedBy: expenseForm.recordedBy,
      service: expenseForm.service,
      description: expenseForm.description || 'New expense entry',
      paymentMethod: expenseForm.paymentMethod,
      notes: expenseForm.notes,
      createdAt: new Date(`${expenseForm.date}T${expenseForm.time}`).toISOString(),
    }

    setTransactions((current) => [newTransaction, ...current])
    setActiveView('dashboard')
    setNotice('Expense successfully recorded.')
    setError('')
    setExpenseForm({
      category: 'Utilities',
      amount: '',
      date: new Date().toISOString().slice(0, 10),
      time: '09:00',
      recordedBy: pastorName,
      service: 'Church Operations',
      description: '',
      paymentMethod: 'Bank Transfer',
      notes: '',
    })
    addAuditEntry(`Recorded ${newTransaction.category} expense ${formatCurrency(amount)}`)
  }

  const handleDelete = (id) => {
    const tx = transactions.find((item) => item.id === id)
    if (!tx) return

    if (window.confirm(`Delete ${tx.id}? This action cannot be undone.`)) {
      setTransactions((current) => current.filter((item) => item.id !== id))
      setNotice(`${tx.id} has been removed.`)
      addAuditEntry(`Deleted ${tx.id}`)
    }
  }

  const handleMemberSubmit = (event) => {
    event.preventDefault()

    if (!memberForm.fullName || !memberForm.phone || !memberForm.address) {
      setError('Please complete the participant name, phone number, and address.')
      return
    }

    const newParticipant = {
      id: buildId('MEM'),
      fullName: memberForm.fullName.trim(),
      phone: memberForm.phone.trim(),
      gender: memberForm.gender,
      address: memberForm.address.trim(),
      role: memberForm.role,
      status: memberForm.status,
      joinDate: memberForm.joinDate,
    }

    setParticipants((current) => [newParticipant, ...current])
    setNotice('Church participant successfully added.')
    setError('')
    setMemberForm({
      fullName: '',
      phone: '',
      gender: 'Male',
      address: '',
      role: 'Member',
      status: 'Active',
      joinDate: new Date().toISOString().slice(0, 10),
    })
    addAuditEntry(`Added participant ${newParticipant.fullName}`)
  }

  const handleDeleteParticipant = (id) => {
    const person = participants.find((item) => item.id === id)
    if (!person) return

    if (window.confirm(`Delete ${person.fullName}? This action cannot be undone.`)) {
      setParticipants((current) => current.filter((item) => item.id !== id))
      setNotice(`${person.fullName} has been removed from church participants.`)
      addAuditEntry(`Deleted participant ${person.fullName}`)
    }
  }

  const handleSettingsSave = (event) => {
    event.preventDefault()
    setNotice('Settings updated successfully.')
    addAuditEntry('Updated financial settings')
  }

  const renderDashboard = () => (
    <div className="page-grid">
      <div className="summary-grid">
        <div className="summary-card accent">
          <span className="label">{currentText.thisWeekIncome}</span>
          <strong>{formatCurrency(currentWeekIncome)}</strong>
        </div>
        <div className="summary-card dark">
          <span className="label">{currentText.thisMonthIncome}</span>
          <strong>{formatCurrency(monthIncome)}</strong>
        </div>
        <div className="summary-card">
          <span className="label">{currentText.thisYearIncome}</span>
          <strong>{formatCurrency(yearIncome)}</strong>
        </div>
        <div className="summary-card danger">
          <span className="label">{currentText.thisWeekExpenses}</span>
          <strong>{formatCurrency(currentWeekExpenses)}</strong>
        </div>
        <div className="summary-card success">
          <span className="label">{currentText.availableBalance}</span>
          <strong>{formatCurrency(currentBalance)}</strong>
        </div>
        <div className="summary-card neutral">
          <span className="label">{currentText.transactionsThisWeek}</span>
          <strong>{transactions.filter((tx) => new Date(tx.date) >= currentWeekStart).length}</strong>
        </div>
      </div>

      <div className="panel-grid">
        <section className="panel">
          <div className="panel-header">
            <h3>{currentText.weeklyOfferings}</h3>
            <span className="chip">{currentText.lastSixWeeks}</span>
          </div>
          <div className="chart-bars">
            {weeklyChartData.map((point) => {
              const maxValue = Math.max(...weeklyChartData.map((item) => item.income || 1), ...weeklyChartData.map((item) => item.expense || 1), 1)
              return (
                <div key={point.label} className="bar-column">
                  <div className="stacked-bars">
                    <span
                      className="bar income-bar"
                      style={{ height: `${(point.income / maxValue) * 100}%` }}
                      title={`${point.label}: ${formatCurrency(point.income)}`}
                    ></span>
                    <span
                      className="bar expense-bar"
                      style={{ height: `${(point.expense / maxValue) * 100}%` }}
                      title={`${point.label}: ${formatCurrency(point.expense)}`}
                    ></span>
                  </div>
                  <small>{point.label}</small>
                </div>
              )
            })}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>{currentText.incomeVsExpenses}</h3>
            <span className="chip">{currentText.current}</span>
          </div>
          <div className="donut-wrap">
            <div className="donut">
              <div className="donut-inner">
                <strong>{formatCurrency(totalIncome - totalExpenses)}</strong>
              </div>
            </div>
            <div className="legend">
              <div><span className="dot income-dot"></span> Income {formatCurrency(totalIncome)}</div>
              <div><span className="dot expense-dot"></span> Expenses {formatCurrency(totalExpenses)}</div>
            </div>
          </div>
        </section>
      </div>

      <div className="dashboard-lower">
        <section className="panel">
          <div className="panel-header">
            <h3>{currentText.recentTransactions}</h3>
            <button type="button" className="link-button" onClick={() => setActiveView('history')}>{currentText.viewAll}</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>{currentText.type}</th>
                <th>{currentText.category}</th>
                <th>{currentText.amount}</th>
                <th>{currentText.date}</th>
                <th>{currentText.action}</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map((tx) => (
                <tr key={tx.id}>
                  <td><span className={`pill ${tx.type}`}>{tx.type}</span></td>
                  <td>{tx.category}</td>
                  <td>{formatCurrency(tx.amount)}</td>
                  <td>{formatDate(tx.date)}</td>
                  <td><button type="button" className="row-delete" onClick={() => handleDelete(tx.id)}>{currentText.delete}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>{currentText.financeAlerts}</h3>
          </div>
          <div className="alert-box warning">
            <p>{currentText.weeklyNetBalance}: {formatCurrency(weeklyNetBalance)}</p>
            {currentWeekExpenses > currentWeekIncome && <strong>{currentText.warningText}</strong>}
            {currentWeekExpenses <= currentWeekIncome && <strong>{currentText.healthyGiving}</strong>}
          </div>
          <div className="alert-box success">
            <p>{currentText.openingBalance}</p>
            <strong>{formatCurrency(settings.openingBalance)}</strong>
          </div>
        </section>
      </div>
    </div>
  )

  const renderOfferingForm = () => (
    <section className="panel form-panel">
      <div className="panel-header">
        <h3>{currentText.recordNewOffering}</h3>
      </div>
      <form onSubmit={handleOfferingSubmit} className="form-grid">
        <label>
          {currentText.offeringCategory}
          <select value={offeringForm.category} onChange={(event) => setOfferingForm({ ...offeringForm, category: event.target.value })}>
            {offeringCategories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          {currentText.amountRwf}
          <input type="number" min="1" value={offeringForm.amount} onChange={(event) => setOfferingForm({ ...offeringForm, amount: event.target.value })} />
        </label>
        <label>
          {currentText.dateReceived}
          <input type="date" value={offeringForm.date} onChange={(event) => setOfferingForm({ ...offeringForm, date: event.target.value })} />
        </label>
        <label>
          {currentText.timeReceived}
          <input type="time" value={offeringForm.time} onChange={(event) => setOfferingForm({ ...offeringForm, time: event.target.value })} />
        </label>
        <label>
          {currentText.recordedBy}
          <input type="text" value={offeringForm.recordedBy} onChange={(event) => setOfferingForm({ ...offeringForm, recordedBy: event.target.value })} />
        </label>
        <label>
          {currentText.serviceEvent}
          <select value={offeringForm.service} onChange={(event) => setOfferingForm({ ...offeringForm, service: event.target.value })}>
            {serviceOptions.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </label>
        <label>
          {currentText.paymentMethod}
          <select value={offeringForm.paymentMethod} onChange={(event) => setOfferingForm({ ...offeringForm, paymentMethod: event.target.value })}>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </label>
        <label className="full-width">
          {currentText.description}
          <input type="text" value={offeringForm.description} onChange={(event) => setOfferingForm({ ...offeringForm, description: event.target.value })} />
        </label>
        <label className="full-width">
          {currentText.notes}
          <textarea rows="3" value={offeringForm.notes} onChange={(event) => setOfferingForm({ ...offeringForm, notes: event.target.value })}></textarea>
        </label>
        <div className="submit-row full-width">
          <button type="submit" className="primary-button">{currentText.saveOffering}</button>
        </div>
      </form>
    </section>
  )

  const renderExpenseForm = () => (
    <section className="panel form-panel">
      <div className="panel-header">
        <h3>{currentText.recordNewExpense}</h3>
      </div>
      <form onSubmit={handleExpenseSubmit} className="form-grid">
        <label>
          {currentText.expenseCategory}
          <select value={expenseForm.category} onChange={(event) => setExpenseForm({ ...expenseForm, category: event.target.value })}>
            {expenseCategories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          {currentText.amountRwf}
          <input type="number" min="1" value={expenseForm.amount} onChange={(event) => setExpenseForm({ ...expenseForm, amount: event.target.value })} />
        </label>
        <label>
          {currentText.dateSpent}
          <input type="date" value={expenseForm.date} onChange={(event) => setExpenseForm({ ...expenseForm, date: event.target.value })} />
        </label>
        <label>
          {currentText.timeSpent}
          <input type="time" value={expenseForm.time} onChange={(event) => setExpenseForm({ ...expenseForm, time: event.target.value })} />
        </label>
        <label>
          {currentText.recordedBy}
          <input type="text" value={expenseForm.recordedBy} onChange={(event) => setExpenseForm({ ...expenseForm, recordedBy: event.target.value })} />
        </label>
        <label>
          {currentText.serviceOperation}
          <input type="text" value={expenseForm.service} onChange={(event) => setExpenseForm({ ...expenseForm, service: event.target.value })} />
        </label>
        <label>
          {currentText.paymentMethod}
          <select value={expenseForm.paymentMethod} onChange={(event) => setExpenseForm({ ...expenseForm, paymentMethod: event.target.value })}>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </label>
        <label className="full-width">
          {currentText.description}
          <input type="text" value={expenseForm.description} onChange={(event) => setExpenseForm({ ...expenseForm, description: event.target.value })} />
        </label>
        <label className="full-width">
          {currentText.notes}
          <textarea rows="3" value={expenseForm.notes} onChange={(event) => setExpenseForm({ ...expenseForm, notes: event.target.value })}></textarea>
        </label>
        <div className="submit-row full-width">
          <button type="submit" className="primary-button">{currentText.saveExpense}</button>
        </div>
      </form>
    </section>
  )

  const renderHistory = () => (
    <section className="panel">
      <div className="panel-header">
        <h3>{currentText.transactionHistory}</h3>
      </div>
      <div className="filters">
        <input
          type="search"
          placeholder={currentText.searchPlaceholder}
          value={filters.search}
          onChange={(event) => {
            setFilters((current) => ({ ...current, search: event.target.value }))
            setPage(1)
          }}
        />
        <select value={filters.type} onChange={(event) => { setFilters((current) => ({ ...current, type: event.target.value })); setPage(1) }}>
          <option value="all">{currentText.allTypes}</option>
          <option value="income">{currentText.income}</option>
          <option value="expense">{currentText.expense}</option>
        </select>
        <select value={filters.category} onChange={(event) => { setFilters((current) => ({ ...current, category: event.target.value })); setPage(1) }}>
          <option value="all">{currentText.allCategories}</option>
          {[...new Set(transactions.map((item) => item.category))].map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <input type="date" value={filters.startDate} onChange={(event) => { setFilters((current) => ({ ...current, startDate: event.target.value })); setPage(1) }} />
        <input type="date" value={filters.endDate} onChange={(event) => { setFilters((current) => ({ ...current, endDate: event.target.value })); setPage(1) }} />
      </div>
      <table className="data-table full-width">
        <thead>
          <tr>
            <th>ID</th>
            <th>{currentText.type}</th>
            <th>{currentText.category}</th>
            <th>{currentText.amount}</th>
            <th>{currentText.date}</th>
            <th>{currentText.recordedBy}</th>
            <th>{currentText.action}</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.length === 0 ? (
            <tr>
              <td colSpan="7" className="empty-row">{currentText.noTransactions}</td>
            </tr>
          ) : (
            paginatedTransactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.id}</td>
                <td><span className={`pill ${tx.type}`}>{tx.type}</span></td>
                <td>{tx.category}</td>
                <td>{formatCurrency(tx.amount)}</td>
                <td>{formatShortDate(tx.date)}</td>
                <td>{tx.recordedBy}</td>
                <td><button type="button" className="row-delete" onClick={() => handleDelete(tx.id)}>{currentText.delete}</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button type="button" disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>{currentText.previous}</button>
        <span>{currentText.page} {page} {currentText.of} {totalPages}</span>
        <button type="button" disabled={page >= totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))}>{currentText.next}</button>
      </div>
    </section>
  )

  const renderParticipants = () => (
    <div className="page-grid">
      <section className="panel form-panel">
        <div className="panel-header">
          <h3>{currentText.addParticipant}</h3>
        </div>
        <form onSubmit={handleMemberSubmit} className="form-grid">
          <label>
            {currentText.fullName}
            <input type="text" value={memberForm.fullName} onChange={(event) => setMemberForm({ ...memberForm, fullName: event.target.value })} />
          </label>
          <label>
            {currentText.phone}
            <input type="tel" value={memberForm.phone} onChange={(event) => setMemberForm({ ...memberForm, phone: event.target.value })} />
          </label>
          <label>
            {currentText.gender}
            <select value={memberForm.gender} onChange={(event) => setMemberForm({ ...memberForm, gender: event.target.value })}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <label>
            {currentText.joinDate}
            <input type="date" value={memberForm.joinDate} onChange={(event) => setMemberForm({ ...memberForm, joinDate: event.target.value })} />
          </label>
          <label>
            {currentText.role}
            <input type="text" value={memberForm.role} onChange={(event) => setMemberForm({ ...memberForm, role: event.target.value })} />
          </label>
          <label>
            {currentText.status}
            <select value={memberForm.status} onChange={(event) => setMemberForm({ ...memberForm, status: event.target.value })}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Visitor">Visitor</option>
            </select>
          </label>
          <label className="full-width">
            {currentText.address}
            <textarea rows="3" value={memberForm.address} onChange={(event) => setMemberForm({ ...memberForm, address: event.target.value })}></textarea>
          </label>
          <div className="submit-row full-width">
            <button type="submit" className="primary-button">{currentText.saveParticipant}</button>
          </div>
        </form>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3>{currentText.participantList}</h3>
        </div>

        <div className="filters">
          <input
            type="search"
            placeholder={currentText.memberSearchPlaceholder}
            value={memberFilters.search}
            onChange={(event) => setMemberFilters((current) => ({ ...current, search: event.target.value }))}
          />
          <select
            value={memberFilters.status}
            onChange={(event) => setMemberFilters((current) => ({ ...current, status: event.target.value }))}
          >
            <option value="all">{currentText.allStatuses}</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Visitor">Visitor</option>
          </select>
        </div>

        {participants.length === 0 ? (
          <p>{currentText.noParticipants}</p>
        ) : filteredParticipants.length === 0 ? (
          <p>{currentText.noParticipantsMatch}</p>
        ) : (
          <table className="data-table full-width">
            <thead>
              <tr>
                <th>Name</th>
                <th>{currentText.phone}</th>
                <th>{currentText.gender}</th>
                <th>{currentText.role}</th>
                <th>{currentText.status}</th>
                <th>{currentText.joinDate}</th>
                <th>{currentText.action}</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map((person) => (
                <tr key={person.id}>
                  <td>{person.fullName}</td>
                  <td>{person.phone}</td>
                  <td>{person.gender}</td>
                  <td>{person.role}</td>
                  <td>{person.status}</td>
                  <td>{formatDate(person.joinDate)}</td>
                  <td><button type="button" className="row-delete" onClick={() => handleDeleteParticipant(person.id)}>{currentText.delete}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )

  const renderReports = () => (
    <div className="page-grid">
      <section className="panel">
        <div className="panel-header">
          <h3>{currentText.monthlyAnnualSummary}</h3>
        </div>
        <div className="summary-grid compact">
          <div className="summary-card accent">
            <span className="label">{currentText.totalIncome}</span>
            <strong>{formatCurrency(totalIncome)}</strong>
          </div>
          <div className="summary-card danger">
            <span className="label">{currentText.totalExpenses}</span>
            <strong>{formatCurrency(totalExpenses)}</strong>
          </div>
          <div className="summary-card success">
            <span className="label">{currentText.netBalance}</span>
            <strong>{formatCurrency(totalIncome - totalExpenses)}</strong>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3>{currentText.categoryBreakdown}</h3>
        </div>
        <div className="category-list">
          {workspaceSpend.map((item) => (
            <div key={item.name} className="category-row">
              <span>{item.name}</span>
              <strong>{formatCurrency(item.value)}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  )

  const renderWeeklySummary = () => (
    <section className="panel">
      <div className="panel-header">
        <h3>{currentText.weeklyOfferingSchedule}</h3>
      </div>
      <div className="weekly-summary">
        {weeklyServiceTotals.length === 0 ? (
          <p>{currentText.noOfferingData}</p>
        ) : (
          weeklyServiceTotals.map((item) => (
            <div className="summary-card neutral" key={item.service}>
              <span className="label">{item.service}</span>
              <strong>{formatCurrency(item.amount)}</strong>
            </div>
          ))
        )}
      </div>
      <div className="alert-box success">
        <p>{currentText.weeklyTotalIncome}</p>
        <strong>{formatCurrency(currentWeekIncome)}</strong>
      </div>
    </section>
  )

  const renderSettings = () => (
    <section className="panel form-panel">
      <div className="panel-header">
        <h3>{currentText.administratorSettings}</h3>
      </div>
      <form onSubmit={handleSettingsSave} className="form-grid">
        <label>
          {currentText.openingBalanceLabel}
          <input type="number" value={settings.openingBalance} onChange={(event) => setSettings({ ...settings, openingBalance: Number(event.target.value) })} />
        </label>
        <label>
          {currentText.reportingWeek}
          <select value={settings.reportingWeekStartsOn} onChange={(event) => setSettings({ ...settings, reportingWeekStartsOn: event.target.value })}>
            <option value="Monday">Monday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </label>
        <div className="submit-row full-width">
          <button type="submit" className="primary-button">{currentText.saveSettings}</button>
        </div>
      </form>
    </section>
  )

  const renderAudit = () => (
    <section className="panel">
      <div className="panel-header">
        <h3>{currentText.auditLog}</h3>
      </div>
      <table className="data-table full-width">
        <thead>
          <tr>
            <th>ID</th>
            <th>Action</th>
            <th>By</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {auditLog.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.action}</td>
              <td>{entry.by}</td>
              <td>{entry.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )

  const contentMap = {
    dashboard: renderDashboard,
    members: renderParticipants,
    offering: renderOfferingForm,
    expense: renderExpenseForm,
    history: renderHistory,
    reports: renderReports,
    weekly: renderWeeklySummary,
    settings: renderSettings,
    audit: renderAudit,
  }

  const currentText = labels[language]
  const navItems = [
    { key: 'dashboard', label: currentText.dashboard },
    { key: 'members', label: currentText.members },
    { key: 'offering', label: currentText.offering },
    { key: 'expense', label: currentText.expense },
    { key: 'history', label: currentText.history },
    { key: 'weekly', label: currentText.weekly },
    { key: 'reports', label: currentText.reports },
    { key: 'settings', label: currentText.settings },
    { key: 'audit', label: currentText.audit },
  ]

  return (
    <>
      {!isAuthenticated ? (
        <div className="login-page">
          <div className="login-card">
            <div className="brand-block">
              <span className="brand-tag">{currentText.churchFinance}</span>
              <h1>Rajepra ESTG</h1>
              <p>{currentText.pastorSecure}</p>
            </div>
            <form onSubmit={handleLogin} className="login-form">
              <label>
                {currentText.email}
                <input type="email" value={loginForm.email} onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })} placeholder="pastor@church.local" />
              </label>
              <label>
                {currentText.password}
                <input type="password" value={loginForm.password} onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })} placeholder="Enter password" />
              </label>
              {error && <div className="alert-box danger">{error}</div>}
              {notice && !error && <div className="alert-box success">{notice}</div>}
              <button type="submit" className="primary-button full-width">{currentText.login}</button>
            </form>
          </div>
        </div>
      ) : (
        <div className={theme === 'dark' ? 'app-shell theme-dark' : 'app-shell theme-light'}>
          <aside className="sidebar">
            <div className="brand-area">
              <div className="brand-mark">RE</div>
              <div>
                <strong>Rajepra ESTG</strong>
                <small>{currentText.offeringSystem}</small>
              </div>
            </div>
            <nav className="side-nav">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={activeView === item.key ? 'nav-item active' : 'nav-item'}
                  onClick={() => setActiveView(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          <main className="main-area">
            <header className="topbar">
              <div>
                <p className="eyebrow">{currentText.churchAdmin}</p>
                <h2>{currentText.title}</h2>
              </div>
              <div className="topbar-actions">
                <div className="toolbar-controls">
                  <label className="toolbar-select">
                    <span>{currentText.language}</span>
                    <select value={language} onChange={(event) => setLanguage(event.target.value)}>
                      <option value="en">{currentText.english}</option>
                      <option value="rw">{currentText.kinyarwanda}</option>
                    </select>
                  </label>
                  <button
                    type="button"
                    className="theme-toggle"
                    onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
                  >
                    {theme === 'light' ? currentText.dark : currentText.light}
                  </button>
                </div>
                <div className="profile-pill">Pastor {pastorName}</div>
                <button type="button" className="primary-button small" onClick={handleLogout}>{currentText.logout}</button>
              </div>
            </header>

            {notice && <div className="banner success-banner">{notice}</div>}
            {error && <div className="banner danger-banner">{error}</div>}

            {contentMap[activeView]?.()}
          </main>
        </div>
      )}
    </>
  )
}

export default App
