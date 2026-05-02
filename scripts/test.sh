#!/usr/bin/env bash
set -euo pipefail

BASE_URL="http://localhost:3000/api"

require() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Missing required command: $1"
    exit 1
  }
}

require curl
require jq

first_names=(Alex Jordan Taylor Morgan Casey Riley Sam Jamie Avery Drew)
last_names=(Lee Kim Patel Garcia Brown Nguyen Wilson Clark Scott Lewis)
course_titles=("Math" "History" "Biology" "Chemistry" "Physics" "Literature" "Economics" "Art")
course_levels=(101 201 301 401)

random_choice() {
  local -n arr=$1
  local idx=$((RANDOM % ${#arr[@]}))
  echo "${arr[$idx]}"
}

random_grade() {
  echo $((60 + RANDOM % 41))
}

random_capacity() {
  echo $((15 + RANDOM % 36))
}

random_email() {
  local first="$1"
  local last="$2"
  local suffix=$((RANDOM % 10000))
  echo "${first,,}.${last,,}${suffix}@example.com"
}

create_student() {
  local name="$1"
  local email="$2"
  local grade="$3"

  curl -s -X POST "$BASE_URL/students" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$name\",\"email\":\"$email\",\"grade\":$grade}" \
    | jq -r '.data.id'
}

create_course() {
  local title="$1"
  local description="$2"
  local max_capacity="$3"

  curl -s -X POST "$BASE_URL/courses" \
    -H "Content-Type: application/json" \
    -d "{\"title\":\"$title\",\"description\":\"$description\",\"max_capacity\":$max_capacity}" \
    | jq -r '.data.id'
}

enroll() {
  local student_id="$1"
  local course_id="$2"

  curl -s -X POST "$BASE_URL/enrollments" \
    -H "Content-Type: application/json" \
    -d "{\"student_id\":$student_id,\"course_id\":$course_id}" \
    | jq -r '.message'
}

echo "Creating random students..."
STUDENT_IDS=()
for i in 1 2 3; do
  first=$(random_choice first_names)
  last=$(random_choice last_names)
  name="$first $last"
  email=$(random_email "$first" "$last")
  grade=$(random_grade)
  id=$(create_student "$name" "$email" "$grade")
  STUDENT_IDS+=("$id")
  echo "  Created student $name (id=$id)"
done

echo "Creating random courses..."
COURSE_IDS=()
for i in 1 2 3; do
  title="$(random_choice course_titles) $(random_choice course_levels)"
  description="Intro to $title"
  capacity=$(random_capacity)
  id=$(create_course "$title" "$description" "$capacity")
  COURSE_IDS+=("$id")
  echo "  Created course $title (id=$id)"
done

echo "Enrolling students..."
for student_id in "${STUDENT_IDS[@]}"; do
  # Enroll each student in 2 random courses
  for j in 1 2; do
    course_id="${COURSE_IDS[$((RANDOM % ${#COURSE_IDS[@]}))]}"
    enroll "$student_id" "$course_id" >/dev/null
    echo "  Enrolled student $student_id in course $course_id"
  done
done

echo "Done."
