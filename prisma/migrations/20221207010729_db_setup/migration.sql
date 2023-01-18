-- CreateTable
CREATE TABLE "MediaType" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,

    CONSTRAINT "MediaType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "tag" VARCHAR(50) NOT NULL,
    "color" VARCHAR(20) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challenge_Type" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,

    CONSTRAINT "Challenge_Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group_Type" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,

    CONSTRAINT "Group_Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Placement" (
    "id" SERIAL NOT NULL,
    "place" INTEGER NOT NULL,
    "points" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "Placement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member_Type" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,

    CONSTRAINT "Member_Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message_Type" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,

    CONSTRAINT "Message_Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "body" VARCHAR(500) NOT NULL,
    "sent_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "FK_message_type_id" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "FK_media_type_id" INTEGER NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "FK_group_type_id" INTEGER NOT NULL,
    "FK_media_id" INTEGER NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group_Message" (
    "id" SERIAL NOT NULL,
    "FK_message_id" INTEGER NOT NULL,
    "FK_group_id" INTEGER NOT NULL,

    CONSTRAINT "Group_Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "start_date" TIMESTAMP(3),
    "deadline" TIMESTAMP(3),
    "FK_challenge_type_id" INTEGER NOT NULL,
    "FK_group_id" INTEGER NOT NULL,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Point_Distribution" (
    "id" SERIAL NOT NULL,
    "start_place" INTEGER NOT NULL,
    "end_place" INTEGER,
    "amount" DECIMAL(12,2) NOT NULL,
    "FK_challenge_id" INTEGER NOT NULL,

    CONSTRAINT "Point_Distribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challenge_Tag" (
    "id" SERIAL NOT NULL,
    "FK_challenge_id" INTEGER NOT NULL,
    "FK_tag_id" INTEGER NOT NULL,

    CONSTRAINT "Challenge_Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(1000) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "refresh_token_hash" VARCHAR(1000),
    "FK_media_id" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Message" (
    "id" SERIAL NOT NULL,
    "FK_message_id" INTEGER NOT NULL,
    "FK_user_id" INTEGER NOT NULL,

    CONSTRAINT "User_Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "nickname" VARCHAR(100),
    "FK_user_id" INTEGER NOT NULL,
    "FK_group_id" INTEGER NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "FK_member_id" INTEGER NOT NULL,
    "FK_member_type_id" INTEGER NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participent" (
    "id" SERIAL NOT NULL,
    "FK_member_id" INTEGER NOT NULL,
    "FK_challenge_id" INTEGER NOT NULL,
    "FK_placement_id" INTEGER NOT NULL,

    CONSTRAINT "Participent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(300) NOT NULL,
    "FK_participent_id" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media_Post" (
    "id" SERIAL NOT NULL,
    "FK_media_id" INTEGER NOT NULL,
    "FK_post_id" INTEGER NOT NULL,

    CONSTRAINT "Media_Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_email_key" ON "User"("username", "email");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_FK_message_type_id_fkey" FOREIGN KEY ("FK_message_type_id") REFERENCES "Message_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_FK_media_type_id_fkey" FOREIGN KEY ("FK_media_type_id") REFERENCES "MediaType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_FK_group_type_id_fkey" FOREIGN KEY ("FK_group_type_id") REFERENCES "Group_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_FK_media_id_fkey" FOREIGN KEY ("FK_media_id") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group_Message" ADD CONSTRAINT "Group_Message_FK_message_id_fkey" FOREIGN KEY ("FK_message_id") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group_Message" ADD CONSTRAINT "Group_Message_FK_group_id_fkey" FOREIGN KEY ("FK_group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_FK_challenge_type_id_fkey" FOREIGN KEY ("FK_challenge_type_id") REFERENCES "Challenge_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_FK_group_id_fkey" FOREIGN KEY ("FK_group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point_Distribution" ADD CONSTRAINT "Point_Distribution_FK_challenge_id_fkey" FOREIGN KEY ("FK_challenge_id") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge_Tag" ADD CONSTRAINT "Challenge_Tag_FK_challenge_id_fkey" FOREIGN KEY ("FK_challenge_id") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge_Tag" ADD CONSTRAINT "Challenge_Tag_FK_tag_id_fkey" FOREIGN KEY ("FK_tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_FK_media_id_fkey" FOREIGN KEY ("FK_media_id") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Message" ADD CONSTRAINT "User_Message_FK_message_id_fkey" FOREIGN KEY ("FK_message_id") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Message" ADD CONSTRAINT "User_Message_FK_user_id_fkey" FOREIGN KEY ("FK_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_FK_user_id_fkey" FOREIGN KEY ("FK_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_FK_group_id_fkey" FOREIGN KEY ("FK_group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_FK_member_id_fkey" FOREIGN KEY ("FK_member_id") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_FK_member_type_id_fkey" FOREIGN KEY ("FK_member_type_id") REFERENCES "Member_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participent" ADD CONSTRAINT "Participent_FK_member_id_fkey" FOREIGN KEY ("FK_member_id") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participent" ADD CONSTRAINT "Participent_FK_challenge_id_fkey" FOREIGN KEY ("FK_challenge_id") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participent" ADD CONSTRAINT "Participent_FK_placement_id_fkey" FOREIGN KEY ("FK_placement_id") REFERENCES "Placement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_FK_participent_id_fkey" FOREIGN KEY ("FK_participent_id") REFERENCES "Participent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media_Post" ADD CONSTRAINT "Media_Post_FK_media_id_fkey" FOREIGN KEY ("FK_media_id") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media_Post" ADD CONSTRAINT "Media_Post_FK_post_id_fkey" FOREIGN KEY ("FK_post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
