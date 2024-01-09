import { Project, fetchFreelancerProjects } from "./fetchProjects";

/*global chrome*/
console.log('[TRACE] Background Script is Running');
chrome.action.onClicked.addListener(function (tab) {
    chrome.tabs.create({ url: chrome.runtime.getURL("popup.html") });
});

chrome.notifications.onClicked.addListener(function (notificationId) {
    chrome.tabs.create({ url: chrome.runtime.getURL("popup.html") });
});

// Running alarm every 2 minutes
chrome.alarms.create("fetchingProjectsData", { periodInMinutes: 2, when: Date.now() });
chrome.alarms.onAlarm.addListener(function (alarm) {
    const name = alarm.name;
    console.log(`[TRACE] Alarm ${name} is Running`);
    if (name === "fetchingProjectsData") {
        chrome.storage.local.get(['projects', 'lastFetchedTimestamp', 'unReadProjectsCount'], async function (result) {

            console.log('[TRACE] Fetching Projects Data');

            const lastFetchedTimestamp = result.lastFetchedTimestamp || 0;
            const projects = (result.projects || []) as Project[];
            const unReadProjectsCount = result.unReadProjectsCount || 0;

            const now = new Date().getTime();

            const freelancerProjects = await fetchFreelancerProjects();

            console.log('[TRACE] Projects Data Fetched');
            console.log('[TRACE] Projects Data', freelancerProjects);

            const newProjectsExpected = freelancerProjects.filter((project) => {
                return project.time_updated * 1000 >= lastFetchedTimestamp;
            });

            const projectsMap = new Map<string, Project>();

            projects.forEach((project) => {
                projectsMap.set(project.id, project);
            });

            if (newProjectsExpected.length > 0) {
                newProjectsExpected.forEach((project) => {
                    projectsMap.set(project.id.toString(), {
                        id: `Freelancer-${project.id}`,
                        title: project.title,
                        description: project.description,
                        budget: {
                            min: project.budget.minimum,
                            max: project.budget.maximum || project.budget.minimum,
                            currency: project.currency.code,
                            isHourly: project.type === 'hourly'
                        },
                        timestamp: project.time_updated * 1000,
                        platform: 'freelancer',
                        url: `https://www.freelancer.com/projects/${project.seo_url}`
                    });
                });

                const allProjects = Array.from(projectsMap.values());

                // Sort by timestamp where the latest project is on the top
                allProjects.sort((a, b) => {
                    return b.timestamp - a.timestamp;
                });

                const allProjectsSliced = allProjects.slice(0, 200);

                const newProjectsCount = allProjectsSliced.length - projects.length;

                chrome.action.setBadgeText({text: `${newProjectsCount + unReadProjectsCount}`}); 
                await chrome.storage.local.set({ projects: allProjectsSliced, lastFetchedTimestamp: now, unReadProjectsCount: newProjectsCount + unReadProjectsCount });
                // Notify user if there is a new project

                // Notify user if there is a new project
                if (allProjects.length > projects.length) {
                    // On click notification, open the popup
                    console.log('[TRACE] New Projects Found');
                    chrome.notifications.create({
                        type: "basic",
                        iconUrl: chrome.runtime.getURL("freelancer.jpeg"),
                        title: "Freelancer.com new Project",
                        message: `${allProjectsSliced.length - projects.length} new projects found!`,
                    });
                }
            }
        });
    }
});