import {Project} from "../background_script/fetchProjects";
import styles from "./ProjectItem.module.css";
import Accordion from "react-bootstrap/Accordion";

const calculatePrice = (budget: Project["budget"]) => {
	let price = "";
	if (budget.isHourly) {
		price += "Hourly rate: ";
	}
	if (budget.min === budget.max) {
		price += `$${budget.min} (${budget.currency})`;
	} else {
		price += `$${budget.min}-${budget.max} (${budget.currency})`;
	}

	return price;
};

const calculateTimePosted = (timestamp: number) => {
	const now = Date.now();
	const difference = now - timestamp;
	const minutes = Math.floor(difference / 1000 / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(weeks / 4);
	const years = Math.floor(months / 12);

	if (years > 0) {
		return `${years} year${years > 1 ? "s" : ""} ago`;
	} else if (months > 0) {
		return `${months} month${months > 1 ? "s" : ""} ago`;
	} else if (weeks > 0) {
		return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
	} else if (days > 0) {
		return `${days} day${days > 1 ? "s" : ""} ago`;
	} else if (hours > 0) {
		return `${hours} hour${hours > 1 ? "s" : ""} ago`;
	} else if (minutes > 0) {
		return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
	} else {
		return "just now";
	}
};

export const ProjectItem = ({
	project,
	eventKey,
	isUnRead,
}: {
	project: Project;
	eventKey: string;
	isUnRead: boolean;
}) => (
	<Accordion.Item eventKey={eventKey}>
		<Accordion.Header
			style={
				isUnRead ? {backgroundColor: "rgba(255, 255, 12, 0.11)"} : {}
			}
		>
			<div className={styles.header}>
				<div className={styles.project_div}>
					<span className={styles.time_posted}>
						Posted {calculateTimePosted(project.timestamp)} ago on{" "}
						<span className={styles.platform}>
							{project.platform}
						</span>
					</span>
					<span className={styles.project_title}>
						{project.title}
					</span>
				</div>
				<div>
					<span className={styles.budget}>
						{calculatePrice(project.budget)}
					</span>
				</div>
			</div>
		</Accordion.Header>
		<Accordion.Body className={styles.description}>
			<pre
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					chrome.tabs.create({
						url: project.url,
					});
				}}
			>
				{project.description}
			</pre>
		</Accordion.Body>
	</Accordion.Item>
);
