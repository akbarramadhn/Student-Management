import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [mahasiswa] = useState([
    {
      nim: '2301001',
      nama: 'Andi Pratama',
      hp: '081234567890',
      email: 'andi.pratama@gmail.com',
      alamat: 'Bandung, Jawa Barat',
      prodi: 'Manajemen',
      tahun: '2023'
    },
    {
      nim: '2301002',
      nama: 'Siti Nurhaliza',
      hp: '082345678901',
      email: 'siti.nur@gmail.com',
      alamat: 'Jakarta Selatan',
      prodi: 'Akuntansi',
      tahun: '2023'
    },
    {
      nim: '2301003',
      nama: 'Budi Santoso',
      hp: '083456789012',
      email: 'budi.santoso@gmail.com',
      alamat: 'Bekasi, Jawa Barat',
      prodi: 'Informatika',
      tahun: '2023'
    },
    {
      nim: '2301004',
      nama: 'Dewi Anggraini',
      hp: '084567890123',
      email: 'dewi.anggraini@gmail.com',
      alamat: 'Bogor, Jawa Barat',
      prodi: 'Manajemen',
      tahun: '2023'
    },
    {
      nim: '2401005',
      nama: 'Rizky Ramadhan',
      hp: '085678901234',
      email: 'rizky.ramadhan@gmail.com',
      alamat: 'Depok, Jawa Barat',
      prodi: 'Sistem Informasi',
      tahun: '2024'
    },
    {
      nim: '2401006',
      nama: 'Putri Maharani',
      hp: '086789012345',
      email: 'putri.maharani@gmail.com',
      alamat: 'Tangerang, Banten',
      prodi: 'Akuntansi',
      tahun: '2024'
    }
  ])

  const [waktu, setWaktu] = useState(new Date())
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth > 700
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setWaktu(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 700) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const formatWaktu = waktu.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })

  const formatTanggal = waktu.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const jumlahProdi = new Set(
    mahasiswa.map((m) => m.prodi)
  ).size

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className={`dashboard ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">S</div>
          <span className="brand-name">Student Management</span>
        </div>

        <div className="sidebar-label">MENU</div>

        <div className="menu-item active">
          <span className="menu-icon">▦</span>
          <span className="menu-text">Dashboard</span>
        </div>

        <div className="menu-item">
          <span className="menu-icon">▤</span>
          <span className="menu-text">Data Mahasiswa</span>
        </div>

        <div className="sidebar-bottom">
          <div className="profile-avatar">AD</div>
          <div className="profile-info">
            <strong>Administrator</strong>
            <small>Admin Sistem</small>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          className="sidebar-overlay"
          onClick={closeSidebar}
          aria-label="Tutup sidebar"
        />
      )}

      <main className="main-content">

        <header className="topbar">
          <div className="topbar-left">
            <button
              className="toggle-button"
              onClick={toggleSidebar}
              aria-label={sidebarOpen ? 'Tutup sidebar' : 'Buka sidebar'}
              aria-expanded={sidebarOpen}
            >
              ☰
            </button>

            <div>
              <h1>Student Management</h1>
              <p>Dashboard / Data Mahasiswa</p>
            </div>
          </div>

          <div className="admin-badge">
            <span className="online-dot"></span>
            Sistem Aktif
          </div>
        </header>

        <section className="welcome-section">
          <span className="welcome-label">
            STUDENT MANAGEMENT SYSTEM
          </span>
          <h2>Selamat Datang</h2>
          <p>Kelola dan pantau informasi data mahasiswa.</p>
        </section>

        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon">01</div>
            <div>
              <p>Total Mahasiswa</p>
              <h3>{mahasiswa.length}</h3>
              <small>Mahasiswa terdaftar</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">02</div>
            <div>
              <p>Program Studi</p>
              <h3>{jumlahProdi}</h3>
              <small>Program studi tersedia</small>
            </div>
          </div>

          <div className="stat-card clock-card">
            <div className="stat-icon">03</div>
            <div>
              <p>Waktu Sekarang</p>
              <h3 className="clock">{formatWaktu}</h3>
              <small>{formatTanggal}</small>
            </div>
          </div>

        </section>

        <section className="table-section">

          <div className="table-heading">
            <div>
              <h2>Daftar Data Mahasiswa</h2>
              <p>Informasi lengkap mahasiswa yang terdaftar.</p>
            </div>

            <div className="total-badge">
              {mahasiswa.length} Mahasiswa
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>NIM</th>
                  <th>Nama Mahasiswa</th>
                  <th>No. HP</th>
                  <th>Email</th>
                  <th>Alamat</th>
                  <th>Program Studi</th>
                  <th>Tahun Masuk</th>
                </tr>
              </thead>

              <tbody>
                {mahasiswa.map((m) => (
                  <tr key={m.nim}>
                    <td className="nim">{m.nim}</td>
                    <td className="student-name">{m.nama}</td>
                    <td>{m.hp}</td>
                    <td>{m.email}</td>
                    <td>{m.alamat}</td>
                    <td>
                      <span className="prodi-badge">
                        {m.prodi}
                      </span>
                    </td>
                    <td>{m.tahun}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            Menampilkan {mahasiswa.length} data mahasiswa
          </div>

        </section>

        <footer>
          © 2026 Student Management
        </footer>

      </main>
    </div>
  )
}

export default App