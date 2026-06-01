# 🎓 EduCore LMS (Learning Management System)

[![Business Model](https://img.shields.io/badge/Business%20Model-SaaS-00DFA2?style=for-the-badge)](https://en.wikipedia.org/wiki/Software_as_a_service)
[![Core Tech](https://img.shields.io/badge/Framework-React%2018%20%2B%20TypeScript-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Infrastructure](https://img.shields.io/badge/Automation-Push%20Notification%20Sync-FF0060?style=for-the-badge)](https://vitejs.dev/)
[![Hosting](https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

**EduCore** adalah platform *Learning Management System* (LMS) terpadu berbasis *Software as a Service* (SaaS) yang dirancang secara khusus untuk memodernisasi dan mendigitalisasi manajemen akademik di berbagai institusi pendidikan. 

Platform ini membawa keunggulan komparatif dengan **menyinkronkan infrastruktur LMS secara langsung ke dalam sistem notifikasi seluler (*push notification*)**. Hal ini memungkinkan otomatisasi pengingat tugas siswa (*automated assignment reminders*) yang dikelola secara penuh melalui model tata kelola menyeluruh (*end-to-end management*), guna menekan angka keterlambatan pengumpulan tugas secara signifikan.

---

## 🏗️ Arsitektur Sistem & Alur Kerja (*End-to-End*)

Sistem otomatisasi *push notification* EduCore bekerja secara berkesinambungan melalui alur infrastruktur berikut:

```text
[ Guru / Pengajar ] ──> Input Tugas Baru (Materi & Deadline)
                              │
                              ▼
                     [ Core Engine LMS ] ──> Menyimpan Metadata Tugas
                              │
                              ▼ (Sinkronisasi Otomatis)
               [ Push Notification Router ]
                              │
         ┌────────────────────┴────────────────────┐
         ▼                                         ▼
[ Notifikasi Web Dashboard ]             [ Notifikasi Seluler Siswa ]
(Pop-up Alert & Badge UI)               (Reminder H-1 & H-3 Jam via PWA)
