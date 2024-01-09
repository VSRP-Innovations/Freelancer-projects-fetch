import styles from "./List.module.css";
import Accordion from "react-bootstrap/Accordion";
import {ProjectItem} from "./ProjectItem";
import {useCallback, useEffect, useState} from "react";
import {Project} from "../background_script/fetchProjects";

export const List = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [unReadProjectsCount, setUnReadProjectsCount] = useState(0);

	const fetchProjects = useCallback(() => {
		chrome.storage.local.get(["projects", "unReadProjectsCount"], (result) => {
			setProjects(result.projects || []);
			setUnReadProjectsCount(result.unReadProjectsCount || 0);
			chrome.storage.local.set({ unReadProjectsCount: 0 })
		});
		chrome.action.setBadgeText({text: ``}); 
	}, []);

	useEffect(() => {
		fetchProjects();
		const timeout = setInterval(() => {
			fetchProjects();
		}, 10000);

		return () => clearInterval(timeout);
	}, [fetchProjects]);

	return (
		<div className={styles.list}>
			<Accordion data-bs-theme="dark">
				{projects.map((project, index) => (
					<ProjectItem
						project={project}
						eventKey={index.toString()}
						key={index.toString()}
						isUnRead={index < unReadProjectsCount}
					/>
				))}
			</Accordion>
		</div>
	);
};
