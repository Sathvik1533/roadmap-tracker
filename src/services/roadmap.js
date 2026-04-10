import { supabase } from '../lib/supabase'

/**
 * Load all persisted state in a single parallel fetch.
 * Returns the same shape the App already uses in memory.
 */
export async function fetchAllData() {
  const [tasksRes, logsRes, projectsRes] = await Promise.all([
    supabase.from('tasks_progress').select('task_key, completed'),
    supabase.from('daily_logs').select('log_key, learned, built, struggled, revise, date'),
    supabase.from('project_status').select('project_key, status'),
  ])

  if (tasksRes.error) throw tasksRes.error
  if (logsRes.error) throw logsRes.error
  if (projectsRes.error) throw projectsRes.error

  const completedTasks = {}
  tasksRes.data.forEach(({ task_key, completed }) => {
    if (completed) completedTasks[task_key] = true
  })

  const dailyLogs = {}
  logsRes.data.forEach(({ log_key, learned, built, struggled, revise, date }) => {
    dailyLogs[log_key] = { learned: learned || '', built: built || '', struggled: struggled || '', revise: revise || '', date }
  })

  const projectStatus = {}
  projectsRes.data.forEach(({ project_key, status }) => {
    projectStatus[project_key] = status
  })

  return { completedTasks, dailyLogs, projectStatus }
}

export async function upsertTask(taskKey, completed) {
  const { error } = await supabase
    .from('tasks_progress')
    .upsert({ task_key: taskKey, completed }, { onConflict: 'task_key' })
  if (error) throw error
}

export async function upsertLog(logKey, logData) {
  const { error } = await supabase
    .from('daily_logs')
    .upsert(
      {
        log_key: logKey,
        learned: logData.learned,
        built: logData.built,
        struggled: logData.struggled,
        revise: logData.revise,
        date: logData.date,
      },
      { onConflict: 'log_key' }
    )
  if (error) throw error
}

export async function upsertProject(projectKey, status) {
  const { error } = await supabase
    .from('project_status')
    .upsert({ project_key: projectKey, status }, { onConflict: 'project_key' })
  if (error) throw error
}
